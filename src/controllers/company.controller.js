const CompanyModel = require('../models/company.model');

exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await CompanyModel.findAll();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCompany = async (req, res) => {
    try {
        const { name, sector, city } = req.body;
        const newCompany = await CompanyModel.create(name, sector, city);
        res.status(201).json(newCompany);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, sector, city } = req.body;
        const updatedCompany = await CompanyModel.update(id, name, sector, city);
        if (!updatedCompany) return res.status(404).json({ message: "Entreprise non trouvée." });
        res.status(200).json(updatedCompany);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await CompanyModel.remove(id);
        if (!deleted) return res.status(404).json({ message: "Entreprise non trouvée." });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};