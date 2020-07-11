import { firebaseDatabaseReference as database } from '../../config'

const referenceUser = 'Users'
const referenceUserRestaurant = 'Restaurant'
const databaseUserRestaurant = database
    .child(referenceUser)
    .child(referenceUserRestaurant)

const getUserRestuarant = (user) => {
    return databaseUserRestaurant.child(user)
}

const registerUserRestaurant = (user) => {
    const { username } = user
    return databaseUserRestaurant.child(username).set(user)
}

export {
    databaseUserRestaurant,
    getUserRestuarant,
    registerUserRestaurant,
    referenceUser,
    referenceUserRestaurant,
}
