const urlMain = '/'
const urlHome = '/home'

const urlDevice = '/devices'
const urlDishe = '/dishes'
const urlOrder = '/orders'
const urlRegister = '/register'

const nameDevice = 'Dispositivos'
const nameDishe = 'Platos'
const nameOrder = 'Pedidos'
const nameRegister = 'Registrar'

const jobs = [
    { name: 'Mesero', job: 'waiter' },
    { name: 'Recepcionista', job: 'receptionist' },
    { name: 'Cocinero', job: 'chef' },
    { name: 'Administrador', job: 'admin' },
]

const access = {
    admin: [
        { name: nameDevice, to: urlDevice },
        { name: nameDishe, to: urlDishe },
        { name: nameOrder, to: urlOrder },
        { name: nameRegister, to: urlRegister },
    ],
    chef: [
        { name: nameDishe, to: urlDishe },
        { name: nameOrder, to: urlOrder },
    ],
    receptionist: [{ name: nameOrder, to: urlOrder }],
    waiter: [{ name: nameOrder, to: urlOrder }],
}

const getAccessAdmin = () => {
    const { admin } = access
    return admin
}

const getAccessChef = () => {
    const { chef } = access
    return chef
}

const getAccessReceptionist = () => {
    const { receptionist } = access
    return receptionist
}

const getAccessWaiter = () => {
    const { waiter } = access
    return waiter
}

const getAccess = (type) => {
    switch (type) {
        case 'admin':
            return getAccessAdmin()
        case 'chef':
            return getAccessChef()
        case 'receptionist':
            return getAccessReceptionist()
        default:
            return getAccessWaiter()
    }
}

const authentification = (type, nameAccess) => {
    const find = getAccess(type).find(({ name }) => name === nameAccess)
    return find !== undefined
}

export {
    getAccess,
    authentification,
    nameDevice,
    nameDishe,
    nameOrder,
    nameRegister,
    urlDevice,
    urlDishe,
    urlOrder,
    urlRegister,
    urlMain,
    urlHome,
    jobs,
}
