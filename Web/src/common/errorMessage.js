const valid = { message: '', error: false }

const sizeString = (min, max, string) => {
    const messageBlank = blank(string)
    if (messageBlank !== valid) {
        return messageBlank
    }
    const size = string.length
    if (min <= size && max >= size) {
        return valid
    }
    return { message: `Debe tener entre ${min} y ${max} caracteres.`, error: true }
}

const blank = (string) => {
    const size = string.length
    if (size === 0) {
        return { message: 'El campo no debe estar vacío', error: true }
    }
    return valid
}

export { sizeString, blank }
