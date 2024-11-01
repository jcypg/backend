const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())


const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Cheezit@101',
    database:'mascotas',
    waitForConnections: true,
});


const getConnection = (callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('error al obtener conexion', err.message)
            return callback(err);
        }
        callback(null, connection)
        
    })
}


app.get('/mascotas', (req, res) => {
    getConnection((err, connection) => {
        if (err) return res.console.log('error al conectar')
        
            let datoSql = 'SELECT * FROM pets';
            connection.query(datoSql, (err, results) => {
                connection.release();

                if (err) {
                   console.error('error al consultar', err.message); 
                }
                res.json(results)
       })
    });
});


app.post('/mascotas', (req, res) => {
    const nombre = req.body.nombre;
    getConnection((err, connection) => {
        if (err) {
            console.log('error al conectar')
        }

            const sql = 'insert into pets (nombre) values (?)';
    connection.query(sql, [nombre], (err, results) => {
        connection.release();
        
        if (err) {
            console.error('Error al insertar elemento:', err.message)
        }
        res.json(results)
       })
    })
})

app.delete('/mascotas/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    getConnection((err, connection) => {
        if (err) {
            console.log('error al conectar')
        }

            const sql = 'delete from pets where nombre = ?';
    connection.query(sql, [nombre], (err, results) => {
        connection.release()
        
        if (err) {
            console.error('Error al eliminar elemento', err.message)
        }
        res.json(results)
       })
    })
})

     



app.listen(3002, () => {
    console.log('api corriendo en http://localhost:3002/mascotas')
});

