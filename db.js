import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL, 
    ssl: {
        require: true,
        rejectUnauthorized: false,
},
});

export default pool;