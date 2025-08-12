const transferService = require('../service/transferService');

exports.transfer = (req, res) => {
  const { from, to, amount } = req.body;
  if (!from || !to || typeof amount !== 'number') return res.status(400).json({ error: 'Dados obrigatórios: from, to, amount' });
  try {
    const transfer = transferService.transfer({ from, to, amount });
    res.status(201).json(transfer);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getTransfers = (req, res) => {
  res.json(transferService.getTransfers());
};
