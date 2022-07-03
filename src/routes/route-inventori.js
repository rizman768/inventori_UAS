require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { inventori } = require('../controllers');

function AuthenticateAccessToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[2];
    console.log(process.env.ACCESS_TOKEN_SECRET);
    console.log(token);
    
    if(token == null){
        res.json({ message: 'Invalid access token'});
    }
    else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
            if(err){
                res.json({ message: err });
            }
            else{
                
                next();
            }
        });
    }
}

// GET localhost:8080/inventori => Ambil data semua inventori
router.get('/inventori', AuthenticateAccessToken, inventori.getDataInventori);

// POST localhost:8080/inventori/add => Tambah data inventori ke database
router.post('/inventori/add', inventori.addDataInventori);

// POST localhost:8080/inventori/2 => Edit data inventori
router.post('/inventori/edit', inventori.editDataInventori);

// POST localhost:8080/inventori/delete => Delete data inventori
router.post('/inventori/delete/', inventori.deleteDataInventori);

module.exports = router;