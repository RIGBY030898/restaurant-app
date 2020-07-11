import { firebaseDatabaseReference as database } from '../../config'

const referenceDevice = 'Devices'

const databaseDevice = database.child(referenceDevice)

const getAllDevices = () => {
    return databaseDevice
}

const updateDevice = (device) => {
    const { uuid } = device
    var { name } = device
    if (name === 'El dispositivo no tiene nombre') device['name'] = ''
    databaseDevice.child(uuid).set(device)
}

const removeDevice = (uuid) => {
    databaseDevice.child(uuid).remove()
}

export { referenceDevice, databaseDevice, getAllDevices, updateDevice, removeDevice }
