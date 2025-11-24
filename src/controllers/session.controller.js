const SessionModel = require('../models/session.model');
const RegistrationModel = require('../models/registration.model');

exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await SessionModel.findAll(); 
        res.status(200).json(sessions);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.createSession = async (req, res) => {
    try {
        const newSession = await SessionModel.create(req.body); 
        res.status(201).json(newSession);
    } catch (error) { res.status(400).json({ message: "Erreur de création de session", details: error.message }); }
};

exports.updateSession = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSession = await SessionModel.update(id, req.body); 
        if (!updatedSession) return res.status(404).json({ message: "Session non trouvée." });
        res.status(200).json(updatedSession);
    } catch (error) { res.status(400).json({ message: "Erreur de mise à jour de session", details: error.message }); }
};

exports.deleteSession = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await SessionModel.remove(id); 
        if (!deleted) return res.status(404).json({ message: "Session non trouvée." });
        res.status(204).send();
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getRegistrationsForSession = async (req, res) => {
    try {
        const { id } = req.params; 
        const registrations = await RegistrationModel.findBySessionId(id); 
        res.status(200).json(registrations);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.registerEmployee = async (req, res) => {
    try {
        const { id } = req.params; 
        const { firstname, lastname, email } = req.body;
        const newRegistration = await RegistrationModel.register(id, firstname, lastname, email); 
        res.status(201).json(newRegistration);
    } catch (error) { res.status(400).json({ message: "Erreur d'inscription (Email déjà enregistré ou données invalides)", details: error.message }); }
};

exports.updateRegistrationStatus = async (req, res) => {
    try {
        const { id } = req.params; 
        const { status } = req.body;
        const updatedRegistration = await RegistrationModel.updateStatus(id, status); 
        if (!updatedRegistration) return res.status(404).json({ message: "Inscription non trouvée." });
        res.status(200).json(updatedRegistration);
    } catch (error) { res.status(400).json({ message: "Erreur de mise à jour du statut", details: error.message }); }
};