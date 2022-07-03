require('dotenv').config();
const router = require('express').Router();
const { inventori } = require('../controllers');

// GET localhost:8080/ => Ambil data semua inventori
router.get('/', inventori.getDataInventori);

// POST localhost:8080/add => Tambah data inventori ke database
router.post('/add', inventori.addDataInventori);

// POST localhost:8080/edit => Edit data inventori
router.post('/edit', inventori.editDataInventori);

// POST localhost:8080/delete => Delete data inventori
router.post('/delete/', inventori.deleteDataInventori);

module.exports = router;