// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Aplicação
const app = require('../../app')

// Mock
const transferService = require('../../service/transferService');

// Testes
describe('Transfer Controller', () => {
        describe('POST /transfers', () =>{   
            
            let token = null;

            beforeEach(async() =>{
            // Capturar o token
            const respostaLogin = await request('http://localhost:3000')
            .post('/login')
            .send({
                username: 'Thaila',
                password: '123456'
                
            });

            token = respostaLogin.body.token;
        })

        it('Quando informo remetente e destinatário inexistente recebo 400', async () =>{
           
            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "Thaila",
                    to: "Wellinton",
                    amount: 100
                });
            expect(resposta.status).to.equal(400);    
        });

         it('Usando Mocks: Quando informo remetente e destinatário inexistente recebo 400', async () =>{
            // Mocar apenas a função transfer do Service
            const transferServiceMock = sinon.stub(transferService, 'transfer')
            transferServiceMock.throws(new Error('Usuário não encontrado'))

            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "Thaila",
                    to: "Wellinton",
                    amount: 100
                });
            expect(resposta.status).to.equal(400);  
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')
            
            //Reseto o Mock
            sinon.restore();
        });

         it('Usando Mocks: Quando informo válidos eu tenho sucesso com 201 CREATED', async () =>{
            // Mocar apenas a função do Service
            const transferServiceMock = sinon.stub(transferService, 'transfer')
            transferServiceMock.returns({
                from: "Thaila",
                to: "Wellinton",
                amount: 100
            })

            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "Thaila",
                    to: "Wellinton",
                    amount: 100
                });
            expect(resposta.status).to.equal(201);  


            // Validação 
            const respostaEsperada = require('../fixture/respostas/QuandoInformoValidosEuTenhoSucessoCom201Created.json')
            //delete resposta.body.date;
            //delete respostaEsperada.date;
            expect(resposta.body).to.deep.equal(respostaEsperada);

            console.log(respostaEsperada)

            expect(resposta.body).to.have.property('from', 'Thaila');
            expect(resposta.body).to.have.property('to', 'Wellinton');
            expect(resposta.body).to.have.property('amount', 100);
            
            //Reseto o Mock
            sinon.restore();
        });
    });
});

