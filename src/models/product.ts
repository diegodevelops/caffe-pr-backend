import client from "../database";

export type Product = {
    id?: number;
    name: string;
    price: number;
    url?: string;
}

export class ProductStore {
    
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            let sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release()
            return result.rows;             
        }
        catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async show(id: number): Promise<Product> {

        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const result = await conn.query(sql, [id]);
            conn.release()
            return result.rows[0];             
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO products (name, price, url) VALUES ($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [p.name, p.price, p.url]);
            conn.release()
            return result.rows[0];             
        }
        catch (err) {
            throw new Error(`Could not create product ${p.name}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            const conn = await client.connect()
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'
            const result = await conn.query(sql, [id])
            const product = result.rows[0]
            conn.release()
            return product
        } catch(err) {
            throw new Error(`unable delete product (${id}): ${err}`)
        }
    }
}