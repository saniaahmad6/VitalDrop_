const db = require('../db_config')
const Bank = require('../models/banks_model')
const { completeMissingBloodTypes } = require('../util/banks_util')

function getBanks(req, res) {
  const sql = Bank.selectBanks

  db.query(sql, (err, data) => {
    if (err) return res.json({ error: true, success: false, message: err.message })
    res.json(data)
  })
}

function getTotalDonatedBlood(req, res) {
  const sql = Bank.selectTotalDonatedBlood

  db.query(sql, (err, data) => {
    if (err) return res.json({ error: true, success: false, message: err.message })
    res.json(data[0])
  })
}

function getNumAvailableBlood(req, res) {
  const sql = Bank.selectNumAvailableBlood

  db.query(sql, (err, data) => {
    if (err) return res.json({ error: true, success: false, message: err.message })
    res.json(data[0])
  })
}

function getAllBloodTypes(req, res) {
  const sql = Bank.selectAvailableBloodTypes

  db.query(sql, (err, data) => {
    if (err) return res.json({ error: true, success: false, message: err.message })
    data = completeMissingBloodTypes(data)
    res.json(data)
  })
}

module.exports = {
  getBanks,
  getTotalDonatedBlood,
  getNumAvailableBlood,
  getAllBloodTypes,
}