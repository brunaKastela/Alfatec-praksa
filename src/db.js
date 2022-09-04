import {readFileSync} from 'fs'
import { MongoClient } from 'mongodb'

const url = "mongodb://localhost:27017";

var _db;

export const initiDB = (async () => {

    MongoClient.connect(url, function(err, mongoclient) {
        _db = mongoclient.db('SouvenirShop');

        _db.collection("Souvenirs").count(function (err, count) {
            if (!err && count === 0) {
                const fileContent = readFileSync('seed.json', 'utf8')
                if(fileContent) {
                    var seedData = JSON.parse(fileContent);
                }
            
                for(const element of seedData['Souvenirs']) {
                    _db.collection("Souvenirs").insertOne(element, function(err, res) {
                        if (err) throw err;
                    });
                }
            }
        });
    })
})

const dbInstance = () => _db;

export default dbInstance;