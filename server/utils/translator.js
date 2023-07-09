const gtranslate = require('@iamtraction/google-translate')

const translate = async (data, fromLang, toLang)=>{
    const res = await gtranslate(data, { from: fromLang, to: toLang })
    // console.log('resla', res)
    return res.text
}


module.exports = translate