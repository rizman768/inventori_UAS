const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Ambil semua data dalam database
    getDataInventori(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM inventori;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results 
                });
            });
            connection.release();
        })
    },
    // Simpan data Inventori
    addDataInventori(req,res){
        let data = {
            no_seri : req.body.no_seri,
            nama_hp : req.body.nama_hp,
            jenis_hp : req.body.jenis_hp,
            tanggal_produksi : req.body.tanggal_produksi
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO inventori SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil tambah data!',
                });
            });
            connection.release();
        })
    },
    // Update data Inventori
    editDataInventori(req,res){
        let dataEdit = {
            no_seri : req.body.no_seri,
            nama_hp : req.body.nama_hp,
            jenis_hp : req.body.jenis_hp,
            tanggal_produksi : req.body.tanggal_produksi
        }
        let id = req.body.no_seri
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE inventori SET ? WHERE no_seri = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
            connection.release();
        })
    },
    // Delete data Inventori
    deleteDataInventori(req,res){
        let id = req.body.no_seri
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM inventori WHERE no_seri = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil hapus data!'
                });
            });
            connection.release();
        })
    }
}