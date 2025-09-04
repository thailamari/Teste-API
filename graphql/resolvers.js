const userService = require('../service/userService');
const transferService = require('../service/transferService');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secretdemo';
// CONTROLLER DO REST
module.exports = {
  Query: { // buscas - não chama direto o banco
    users: () => userService.listUsers(),
    transfers: (parent, args, context) => {
      if (!context.user) throw new Error('Autenticação obrigatória');
      return transferService.listTransfers();
    },
  },
  Mutation: { // alterações no servidor - não chama direto o banco
    registerUser: (parent, { username, password, isFavored }) => {
      return userService.registerUser({ username, password, isFavored });
    },
    loginUser: (parent, { username, password }) => {
      const user = userService.loginUser({ username, password });
      const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });
      return { token, user };
    },
    createTransfer: (parent, { from, to, amount }, context) => {
      if (!context.user) throw new Error('Autenticação obrigatória');
      return transferService.transfer({ from, to, amount });
    },
  },
};