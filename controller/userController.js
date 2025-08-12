const userService = require('../service/userService');

exports.register = (req, res) => {
  const { username, password, isFavored } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  try {
    const user = userService.registerUser({ username, password, isFavored });
    res.status(201).json({ username: user.username, isFavored: user.isFavored });
  } catch (e) {
    res.status(409).json({ error: e.message });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  try {
    const user = userService.authenticateUser(username, password);
    res.json({ username: user.username, isFavored: user.isFavored });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

exports.getUsers = (req, res) => {
  res.json(userService.getAllUsers());
};
