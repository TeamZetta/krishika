const Bazar = require("../models/bazar.model")
const User = require('../models/user.model')
const translate = require('../utils/translator')

/* SERVER SIDE PAGINATION */
exports.getAllBazars = async (req, res) => {
    try {
        const { page, pageSize } = req.query // { page = 0, pageSize = 20 }
        const bazars = await Bazar.find().limit(pageSize).skip(page * pageSize)

        return res.status(200).json(bazars)
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

exports.getAllDistricts = async(req, res)=>{
    let { from, to } = req.params
    try {
        const allDistricts = await Bazar.find().distinct('district')

        let query = allDistricts.join(' || ')
        let translated = await translate(query, from, to);
        translated = translated.split(' || ');

        return res.status(200).json({district : translated})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
}

exports.searchByDistrict = async (req, res) => {
    let { to, from, district } = req.params
    
    district = district.toLowerCase()
    try {
        let bazars = await Bazar.find({ district: new RegExp(`^${district}$`, 'i') })
        if(bazars.length === 0)
            return res.status(409).json({ bazars, district, message: "Bazars not found" })
        else{
            let query = ''
            bazars.forEach(b => {
                query += `${b.name}@${b.address}@${b.district}@${b.functioning_status.join('$')}@${b.paddy_procurement}|`
            })

            let translated = await translate(query, from, to);
            translated = translated.replace(/\|+$/, '').split('|')

            for(let i=0;i<bazars.length;i++){
                const data = translated[i].split('@')
                bazars[i].name = data[0]
                bazars[i].address = data[1]
                bazars[i].district = data[2]
                bazars[i].functioning_status = data[3].split('$')
                bazars[i].paddy_procurement = data[4]
            }
            
            return res.status(200).json({ bazars, district })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
}



exports.addBazar = async (req, res) => {
    try {
        const { userId } = req.user

        if (userId) {
            const { name, address, project_cost, district, functioning_status, paddy_procurement } = req.body
            const newBazar = new Bazar({ name, address, project_cost, district, functioning_status, paddy_procurement })

            try {
                const user = await User.findById(userId)
                if (user.admin) {
                    const bazar = await newBazar.save()
                    return res.status(201).json({ bazar, message: "Bazar Added" })
                }
                else {
                    return res.status(403).json({ error: 'Not Authorized' })
                }
            }
            catch (err) {
                return res.status(401).json(err)
            }
        }
    }
    catch (err) {
        return res.status(500).json(err)
    }
}