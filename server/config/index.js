require('dotenv').config()



module.exports = {
    PORT: process.env.PORT,   
    DB_URI: process.env.DB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    VONAGE_APIKEY: process.env.VONAGE_APIKEY,
    VONAGE_APISECRET: process.env.VONAGE_APISECRET,
    FAKE_SMS: process.env.FAKE_SMS === 'on' ? true : false,
    CLIENT_URL: process.env.CLIENT_URL
}