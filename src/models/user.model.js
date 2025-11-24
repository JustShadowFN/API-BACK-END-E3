const { sqlPool } = require('../services/db');

const UserModel = {
    async create(username, password, role) {
        const query = `INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role`;
        const result = await sqlPool.query(query, [username, password, role]);
        return result.rows[0];
    },
    async findByUsername(username) {
        const query = `SELECT * FROM users WHERE username = $1`;
        const result = await sqlPool.query(query, [username]);
        return result.rows[0];
    }
};

module.exports = UserModel;