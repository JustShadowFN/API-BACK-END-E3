const { sqlPool } = require('../services/db');

const SessionModel = {
    async findAll() {
        const query = `
            SELECT s.*, t.title AS training_title, c.name AS company_name
            FROM sessions s
            JOIN trainings t ON s.training_id = t.id
            JOIN companies c ON s.company_id = c.id
            ORDER BY s.date, s.time;
        `; 
        const result = await sqlPool.query(query);
        return result.rows;
    },
    async findById(id) {
        const result = await sqlPool.query('SELECT * FROM sessions WHERE id = $1', [id]);
        return result.rows[0];
    },
    async create(data) { 
        const { training_id, date, time, duration, company_id, trainer_name, max_participants } = data;
        const query = `
            INSERT INTO sessions (training_id, date, time, duration, company_id, trainer_name, max_participants)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
        `; 
        const values = [training_id, date, time, duration, company_id, trainer_name, max_participants];
        const result = await sqlPool.query(query, values);
        return result.rows[0];
    },
    async update(id, data) {
        const fields = Object.keys(data).map((key, index) => `${key} = $${index + 1}`).join(', ');
        const values = [...Object.values(data), id];
        const query = `UPDATE sessions SET ${fields} WHERE id = $${values.length} RETURNING *;`; 
        const result = await sqlPool.query(query, values);
        return result.rows[0];
    },
    async remove(id) {
        const result = await sqlPool.query('DELETE FROM sessions WHERE id = $1 RETURNING id', [id]); 
        return result.rows[0];
    }
};

module.exports = SessionModel;