require('dotenv').config();
const router = require('express').Router();
const { inventori } = require('../controllers');

// GET localhost:8080/inventori => Ambil data semua inventori
router.get('/inventori', inventori.getDataInventori);

// POST localhost:8080/inventori/add => Tambah data inventori ke database
router.post('/inventori/add', inventori.addDataInventori);

// POST localhost:8080/inventori/2 => Edit data inventori
router.post('/inventori/edit', inventori.editDataInventori);

// POST localhost:8080/inventori/delete => Delete data inventori
router.post('/inventori/delete/', inventori.deleteDataInventori);

module.exports = router;