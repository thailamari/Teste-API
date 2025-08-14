// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Aplicação
const app = require('../../app')

// Testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () =>{
        it('Quando informo remetente e destinatário inexistente recebo 400', async () =>{
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "Thaila",
                    to: "Wellinton",
                    amount: 100
                });
            expect(resposta.status).to.equal(400);    
        });
    });
});

