const mongoose = require('mongoose');

const WorkshopDetailsSchema = new mongoose.Schema({
    training_id: {
        type: String, 
        required: true,
        unique: true
    },
    modules: [{
        title: { type: String, required: true },
        duration: { type: Number, required: true }
    }],
    material_needed: [String], 
    level: {
        type: String,
        enum: ['débutant', 'intermédiaire', 'avancé'],
        default: 'débutant'
    }
}, { timestamps: true });

module.exports = mongoose.model('WorkshopDetail', WorkshopDetailsSchema);