// Bibliotecas
const request = require('supertest');
const { expect } = require('chai');


// Testes
describe('Transfer Controller', () => {
        describe('POST /register', () =>{   
            
            let token = null;

            beforeEach(async() =>{
            // Capturar o token
            const respostaLogin = await request('http://localhost:3000')
            .post('/login')
            .send({
                username: 'Thaila',
                password: '123456'
                
            });

            this.token = respostaLogin.body.token;
        })

        it('Quando informo usuário sem username e password recebo 400', async () =>{
           
              const resposta = await request('http://localhost:3000')
                .post('/register')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    username: null,
                    password: null,
                    isFavored: 100
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal('Usuário e senha obrigatórios')   
        });
    });
});