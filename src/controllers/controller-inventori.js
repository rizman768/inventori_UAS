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
            inventori_no_seri : req.body.no_seri,
            inventori_nama_hp : req.body.nama_hp,
            inventori_jenis_hp : req.body.jenis_hp,
            inventori_tanggal_rilis : req.body.tanggal_rilis
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
            inventori_no_seri : req.body.no_seri,
            inventori_nama_hp : req.body.nama_hp,
            inventori_jenis_hp : req.body.jenis_hp,
            inventori_tanggal_rilis : req.body.tanggal_rilis
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE inventori SET ? WHERE inventori_id = ?;
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
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM Inventori WHERE inventori_id = ?;
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