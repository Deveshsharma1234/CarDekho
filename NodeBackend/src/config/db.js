const mysql =  require('mysql2');
console.log(process.env.DB_HOST);

const pool = mysql.createPool({
     host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DATABASE_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
})
const connectDB = ()=>{
    pool.getConnection((err,connection)=>{
        if(err){
            console.error('❌ Database connection failed:', err.message);
            throw err;
        }else{
            console.log('✅ Database connected successfully!');
            connection.release();
        }
    })
}

module.exports = {pool, connectDB}