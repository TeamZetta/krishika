const generateOTP = (length) => {
    return Math.random().toString().substring(2, 2 + length)
}

const generateUserName = (name) => {
    return name.split(' ')[0] + "#" + Math.random().toString().substring(2, 6)
}

module.exports = { generateOTP, generateUserName }
