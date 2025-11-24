const { sqlPool } = require('../services/db');
const { v4: uuidv4 } = require('uuid');

const TrainingModel = {
    async findAll() {
        const result = await sqlPool.query('SELECT * FROM trainings ORDER BY title'); 
        return result.rows;
    },
    async findById(id) {
        const result = await sqlPool.query('SELECT * FROM trainings WHERE id = $1', [id]);
        return result.rows[0];
    },
    async create(title, category, description) {
        const id = uuidv4();
        const query = `
            INSERT INTO trainings (id, title, category, description)
            VALUES ($1, $2, $3, $4) RETURNING *;
        `; 
        const result = await sqlPool.query(query, [id, title, category, description]);
        return result.rows[0];
    },
    async update(id, title, category, description) {
        const query = `
            UPDATE trainings SET title = $1, category = $2, description = $3
            WHERE id = $4 RETURNING *;
        `; 
        const result = await sqlPool.query(query, [title, category, description, id]);
        return result.rows[0];
    },
    async remove(id) {
        const result = await sqlPool.query('DELETE FROM trainings WHERE id = $1 RETURNING id', [id]); 
        return result.rows[0];
    }
};

module.exports = TrainingModel;