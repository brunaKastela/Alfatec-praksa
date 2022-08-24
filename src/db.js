import {readFileSync} from 'fs'
import { MongoClient } from 'mongodb'

// Logic to create db and seed all data if not present in db
const url = "mongodb://localhost:27017/";

export const initiDB = (async () => {
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("SouvenirShop");
        
        dbo.collection("Souvenirs").count(function (err, count) {
            if (!err && count === 0) {
                const fileContent = readFileSync('seed.json', 'utf8')

                if(fileContent) {
                    var seedData = JSON.parse(fileContent);
                }
            
                for(const element of seedData['Souvenirs']) {
                    dbo.collection("Souvenirs").insertOne(element, function(err, res) {
                        if (err) throw err;
                    });
                }
            }
        });
    });
})

// Example service to fetch all products
export const getAllData = async () => {

    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("SouvenirShop");

            dbo.collection("Souvenirs").find({}).toArray( function(err, result) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }

                return resolve(result);
            })
        })
    })
}