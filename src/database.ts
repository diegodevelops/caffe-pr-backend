import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    POSTGRES_TEST_HOST,
    POSTGRES_TEST_DB,
    POSTGRES_TEST_USER,
    POSTGRES_TEST_PASSWORD,
    ENV
} = process.env;


let client: Pool | undefined;
console.log(`ENV = ${ENV}`);

if (ENV==='test') {
    client = new Pool({
        host: POSTGRES_TEST_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_TEST_USER,
        password: POSTGRES_TEST_PASSWORD
    });
}

if (ENV==='dev') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: parseInt(POSTGRES_PORT || ''),
        ssl: {
            rejectUnauthorized: false
        }
    });
}


export default client as Pool;