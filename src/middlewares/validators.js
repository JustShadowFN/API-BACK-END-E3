const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};

const authSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'rh', 'trainer', 'user').optional()
});

const sessionSchema = Joi.object({
    training_id: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.string().required(),
    duration: Joi.number().required(),
    company_id: Joi.string().required(),
    trainer_name: Joi.string().required(),
    max_participants: Joi.number().required()
});

module.exports = { validate, authSchema, sessionSchema };