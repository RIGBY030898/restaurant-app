import React, { Component } from 'react'
import { InputFile } from '../components'
import {
    firebaseStorageReference as storage,
    firebaseDatabaseReference as database
} from '../config'

class RegisterImage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: null,
            url: '',
            progress: 0,
            upload: []
        }
    }

    componentDidMount() {
        const { reference = '' } = this.props
        database.child('Images').child(reference).on('value', 
        snapshot => {
            if (snapshot.exists()) {
                this.setState({
                    upload: Object.keys(snapshot.val())
                })
            }
        })
    }

    uploadImage = (name, image) => {
        const { reference = '' } = this.props
        const uploadTask = storage.child(`${reference}/${name}`).put(image)
        uploadTask.on('state_changed',
        snapshot => {
            //progress function
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            this.setState({progress})
        }, error => {
            //error function
            console.error(error)
        }, () => {
            //complete function
            storage.child(reference).child(name).getDownloadURL()
                .then(getUrl => {
                    this.setState({url: getUrl})
                    const {url} = this.state
                    const upload = {
                        name: name,
                        url: url
                    }
                    database.child('Images').child(reference).child(name).set(upload)
                    this.setState({progress: 0})
                })
        })
    }

    handleFile = e => {
        const image = e.target.files[0]
        if(image) {
            this.setState({ image })
        }
    }

    handleUpload = e => {
        const { image, upload } = this.state
        const name = image.name.split('.')[0]
        const exists = upload.find(up => up===name)
        const empty = upload.length === 0
        if (empty) {
            this.uploadImage(name, image)
        } else {
            if(!exists) {
                this.uploadImage(name, image)
            } else {
                alert("Ya existe la imagen \"" + name + "\" en la BD.")
            }
        }
    }

    render() {
        const { url, progress } = this.state
        return(
            <div>
                <div>
                    <progress value={progress} max="100" />
                </div>
                <InputFile accept="image/*" handleFile={this.handleFile} />
                <div>
                    <img src={url || 'http://via.placeholder.com/400x400'} alt="Firebase Storage" />
                </div>
                <div>
                    <button onClick={this.handleUpload}>Subir</button>
                </div>
            </div>
        )
    }
}

export default RegisterImage;