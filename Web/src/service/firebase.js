import { firebaseDatabaseReference as database } from '../config'

const databaseUserRestaurant = database.child('Users').child('Restaurant')

const getUserRestuarant = (user) => {
    return databaseUserRestaurant.child(user)
}

const registerUserRestaurant = (user) => {
    const { username } = user
    return databaseUserRestaurant.child(username).set(user)
}

export { databaseUserRestaurant, getUserRestuarant, registerUserRestaurant }
