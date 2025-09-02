// Bibliotecas
const request = require('supertest');
const { expect } = require('chai');


// Testes
describe('Transfer External', () => {
    describe('POST /transfers', () =>{
        it.only('Quando informo remetente e destinatário inexistente recebo 400', async () =>{
            // 1) Capturar o token
             const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .send({
                    username: 'Thaila',
                    password: '123456'
                    
                });
            const token = respostaLogin.body.token;    

            // 2) Realizar a Transferência
            const resposta = await request('http://localhost:3000')
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`) //cabeçalho
                .send({
                    from: 'Jose',
                    to: 'Joana',
                    amount: 200
                });
            expect(resposta.status).to.equal(400);   
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado') 
        });
     });
  });
