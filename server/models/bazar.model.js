const mongoose = require('mongoose')

const bazarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    project_cost: {
        type: String
    },
    district: {
        type: String,
        required: true,
        index: true
    },
    functioning_status: {
        type: Array
    },
    paddy_procurement: {
        type: String
    }
},
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.createdAt
                delete ret.updatedAt
                delete ret.__v
            }
        }
    }
)


const Bazar = mongoose.model('Bazar', bazarSchema)

module.exports = Bazar