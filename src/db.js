import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import {readFileSync} from 'fs'

sqlite3.verbose()

// Logic to create db and seed all data if not present in db

export const initiDB = (async () => {
    const db = await open({
      filename: './database.db',
      driver: sqlite3.Database
    })

    // Generate table
    const tableExists = await db.get("SELECT * FROM sqlite_master WHERE name='Products' and type='table'")

    if(!tableExists) {
        await db.run(`CREATE TABLE Products (id TEXT, 
                                            name TEXT,
                                            productImageUrl TEXT,
                                            quantity TEXT,
                                            color TEXT,
                                            barCode TEXT)`);

        
        // Reed seed files from json file
        const fileContent = readFileSync('seed.json', 'utf8')
        
        if(fileContent) {
            const seedData = JSON.parse(fileContent);

            // Insert seed data to table
            const stmt = await db.prepare("INSERT INTO Products (id, name, barCode, color, quantity, productImageUrl) VALUES (@id, @name, @barCode, @color, @quantity, @productImageUrl)");
            
            seedData['Souvenirs'].forEach(async (product) => {
                 await stmt.run(product.id, 
                                product.name, 
                                product.barCode, 
                                product.color, 
                                product.quantity, 
                                product.productImageUrl);
            })

            await stmt.finalize();
        }
    
    }

    db.close()

})

// Example service to fetch all products
export const getAllData = async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
      });

    const items = await db.all("SELECT * from Products")

    db.close();

    return items;

}