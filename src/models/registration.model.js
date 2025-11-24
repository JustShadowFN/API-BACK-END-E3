const { sqlPool } = require('../services/db');

const RegistrationModel = {
    async register(session_id, firstname, lastname, email) {
        const status = 'registered'; 
        const query = `
            INSERT INTO registrations (session_id, firstname, lastname, email, status)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `; 
        const values = [session_id, firstname, lastname, email, status];
        const result = await sqlPool.query(query, values);
        return result.rows[0];
    },
    async findBySessionId(sessionId) {
        const query = `
            SELECT id, firstname, lastname, email, status
            FROM registrations
            WHERE session_id = $1
            ORDER BY lastname, firstname;
        `; 
        const result = await sqlPool.query(query, [sessionId]);
        return result.rows;
    },
    async updateStatus(id, newStatus) {
        if (!['registered', 'present', 'absent'].includes(newStatus)) {
            throw new Error('Statut d\'inscription invalide.');
        }

        const query = `
            UPDATE registrations
            SET status = $1
            WHERE id = $2
            RETURNING *;
        `; 
        const result = await sqlPool.query(query, [newStatus, id]);
        return result.rows[0];
    }
};

module.exports = RegistrationModel;