const Bazar = require("../models/bazar.model")
const User = require('../models/user.model')


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
    try {
        const uniqueDistricts = await Bazar.find().distinct('district')

        return res.status(200).json(uniqueDistricts)
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

exports.searchByDistrict = async (req, res) => {
    let { district } = req.params
    district = district.toLowerCase()
    try {
        const bazars = await Bazar.find({ district: new RegExp(`^${district}$`, 'i') })
        if(bazars.length === 0)
            return res.status(409).json({ bazars, district, message: "Bazars not found" })
        return res.status(200).json({ bazars, district })
    }
    catch (err) {
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