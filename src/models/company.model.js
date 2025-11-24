const { sqlPool } = require('../services/db');

const CompanyModel = {
    async findAll() {
        const result = await sqlPool.query('SELECT * FROM companies ORDER BY name');
        return result.rows;
    },
    async findById(id) {
        const result = await sqlPool.query('SELECT * FROM companies WHERE id = $1', [id]);
        return result.rows[0];
    },
    async create(name, sector, city) {
        const query = 'INSERT INTO companies (name, sector, city) VALUES ($1, $2, $3) RETURNING *';
        const result = await sqlPool.query(query, [name, sector, city]);
        return result.rows[0];
    },
    async update(id, name, sector, city) {
        const query = 'UPDATE companies SET name = $1, sector = $2, city = $3 WHERE id = $4 RETURNING *';
        const result = await sqlPool.query(query, [name, sector, city, id]);
        return result.rows[0];
    },
    async remove(id) {
        const result = await sqlPool.query('DELETE FROM companies WHERE id = $1 RETURNING id', [id]);
        return result.rows[0];
    }
};

module.exports = CompanyModel;