const { users } = require('../model/userModel');

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function registerUser({ username, password, isFavored }) {
  if (findUserByUsername(username)) {
    throw new Error('Usuário já existe');
  }
  const user = { username, password, isFavored: !!isFavored, balance: 10000 };
  users.push(user);
  return user;
}

function authenticateUser(username, password) {
  const user = findUserByUsername(username);
  if (!user || user.password !== password) {
    throw new Error('Credenciais inválidas');
  }
  return user;
}

function getAllUsers() {
  return users.map(u => ({ username: u.username, isFavored: u.isFavored, balance: u.balance }));
}

module.exports = {
  findUserByUsername,
  registerUser,
  authenticateUser,
  getAllUsers
};
