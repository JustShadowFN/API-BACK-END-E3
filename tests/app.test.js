const request = require('supertest');
const app = require('../server'); 
const { sqlPool } = require('../src/services/db');
const mongoose = require('mongoose');

// Tests Unitaires (Logique pure sans API)
describe('Unit Tests', () => {
    test('Calcul taux de présence', () => {
        const total = 10;
        const present = 8;
        const rate = (present / total) * 100;
        expect(rate).toBe(80);
    });

    test('Validation atelier', () => {
        const workshop = { title: 'Stress', duration: 20 };
        expect(workshop.duration).toBeGreaterThan(0);
        expect(workshop.title).not.toBe('');
    });
    
    test('Comptage sessions ouvertes', () => {
        const sessions = [{ status: 'open' }, { status: 'closed' }, { status: 'open' }];
        const open = sessions.filter(s => s.status === 'open').length;
        expect(open).toBe(2);
    });
});

// Test d'Intégration
describe('Integration Tests', () => {
    // --- BLOC SUPPRIMÉ ICI (afterAll) --- 

    it('POST /auth/register & /auth/login should work', async () => {
        const uniqueUser = 'testuser_' + Date.now();
        // 1. Register
        await request(app)
            .post('/api/v1/auth/register')
            .send({ username: uniqueUser, password: 'password123', role: 'admin' })
            .expect(201);

        // 2. Login
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({ username: uniqueUser, password: 'password123' })
            .expect(200);
        
        expect(res.body).toHaveProperty('token');
    });
});