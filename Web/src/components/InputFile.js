import React, { Fragment } from 'react'

const InputFile = ({accept, handleFile}) => {

    return (
        <Fragment>
            <input type="file" accept={accept} onChange={handleFile}/>
        </Fragment>
    )
}

export default InputFile