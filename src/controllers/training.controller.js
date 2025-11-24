const TrainingModel = require('../models/training.model');
const WorkshopDetail = require('../models/workshopDetails.model');

exports.getAllTrainings = async (req, res) => {
    try {
        const trainings = await TrainingModel.findAll();
        res.status(200).json(trainings);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.createTraining = async (req, res) => {
    try {
        const { title, category, description } = req.body;
        const newTraining = await TrainingModel.create(title, category, description);
        res.status(201).json(newTraining);
    } catch (error) { res.status(400).json({ message: error.message }); }
};

exports.updateTraining = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, description } = req.body;
        const updatedTraining = await TrainingModel.update(id, title, category, description);
        if (!updatedTraining) return res.status(404).json({ message: "Formation non trouvée." });
        res.status(200).json(updatedTraining);
    } catch (error) { res.status(400).json({ message: error.message }); }
};

exports.deleteTraining = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await TrainingModel.remove(id);
        if (!deleted) return res.status(404).json({ message: "Formation non trouvée." });
        
        await WorkshopDetail.deleteOne({ training_id: id });
        
        res.status(204).send(); 
    } catch (error) { res.status(500).json({ message: error.message }); }
};



exports.getWorkshopDetails = async (req, res) => {
    try {
        const { id } = req.params; 
        const details = await WorkshopDetail.findOne({ training_id: id }); 
        if (!details) return res.status(404).json({ message: "Détails de l'atelier non trouvés." });
        res.status(200).json(details);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.createWorkshopDetails = async (req, res) => {
    try {
        const { id } = req.params; 
        const { modules, material_needed, level } = req.body;
        
        const trainingExists = await TrainingModel.findById(id);
        if (!trainingExists) return res.status(404).json({ message: "ID de formation SQL invalide." });

        const details = await WorkshopDetail.create({
            training_id: id, modules, material_needed, level
        }); 
        res.status(201).json(details);
    } catch (error) { res.status(400).json({ message: error.message }); }
};

exports.updateWorkshopDetails = async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedDetails = await WorkshopDetail.findOneAndUpdate(
            { training_id: id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedDetails) return res.status(404).json({ message: "Détails de l'atelier non trouvés." });
        res.status(200).json(updatedDetails);
    } catch (error) { res.status(400).json({ message: error.message }); }
};