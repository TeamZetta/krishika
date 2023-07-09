const gtranslate = require('@iamtraction/google-translate');

const translate = async (data, fromLang, toLang)=>{
    const res = await gtranslate(data, { from: fromLang, to: toLang })
    // console.log('resla', res);
    return res.text
}

// async function asd(){
// l = await translate("Sitalkuchi Krishak Bazar", 'en', 'bn')
// console.log(l)
// }

// asd()

module.exports = translate;