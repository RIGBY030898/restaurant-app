import { firebaseDatabaseReference as database } from '../../config'

const referenceDishe = 'Products'
const referenceFood = 'Foods'
const referenceDrink = 'Drinks'
const referenceDessert = 'Desserts'
const referenceCombo = 'Combos'
const databaseDishe = database.child(referenceDishe)

const nameFood = 'Comida'
const nameDrink = 'Bebida'
const nameDessert = 'Postre'
const nameCombo = 'Combo'

const products = [
    { name: nameFood, product: referenceFood },
    { name: nameDrink, product: referenceDrink },
    { name: nameDessert, product: referenceDessert },
    { name: nameCombo, product: referenceCombo },
]

const getFoods = () => {
    return databaseDishe.child(referenceFood)
}

const getDrinks = () => {
    return databaseDishe.child(referenceDrink)
}

const getDesserts = () => {
    return databaseDishe.child(referenceDessert)
}

const getCombos = () => {
    return databaseDishe.child(referenceCombo)
}

const updateProduct = (reference, product) => {
    const { name } = product
    databaseDishe.child(reference).child(name).set(product)
}

const deleteProduct = (reference, name) => {
    databaseDishe.child(reference).child(name).remove()
}

const getProduct = (reference, name) => {
    return databaseDishe.child(reference).child(name)
}

export {
    referenceDishe,
    referenceFood,
    referenceDrink,
    referenceCombo,
    referenceDessert,
    databaseDishe,
    getFoods,
    getDrinks,
    getDesserts,
    getCombos,
    updateProduct,
    deleteProduct,
    nameFood,
    nameDrink,
    nameDessert,
    nameCombo,
    products,
    getProduct,
}
