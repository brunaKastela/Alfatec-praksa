import {readFileSync} from 'fs'
import { MongoClient } from 'mongodb'

//import { Double, MongoClient } from 'mongodb'

// Logic to create db and seed all data if not present in db
const url = "mongodb://localhost:27017/SouvenirShop";
var db;

const connectToDB = (async () => {

    try {
        MongoClient.connect(url, function(err, database) {
            if (err) throw err;
            db = database;
            console.log("Connecting..."); // nema ispisa
        });
        console.log("Connected"); // db = undefined
    } catch(err) {
        console.log(err);
    }
})

export const initiDB = (async () => {

    await connectToDB();
    console.log(db); // undefined

    db.collection("Souvenirs").count(function (err, count) {  // TypeError: Cannot read properties of undefined (reading 'collection')
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


    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("SouvenirShop");
    //     console.log("Connected");

    //     dbo.collection("Souvenirs").count(function (err, count) {
    //         if (!err && count === 0) {
    //             const fileContent = readFileSync('seed.json', 'utf8')

    //             if(fileContent) {
    //                 var seedData = JSON.parse(fileContent);
    //             }
            
    //             for(const element of seedData['Souvenirs']) {
    //                 dbo.collection("Souvenirs").insertOne(element, function(err, res) {
    //                     if (err) throw err;
    //                 });
    //             }
    //         }
    //     });
    // });

})

// Example service to fetch all products
export const getAllData = async () => {

    db.collection("Souvenirs").find({}).toArray( function(err, result) {
        if (err) {
            console.log(err);
            return reject(err);
        }
        return resolve(result);
    })

    // return new Promise(function(resolve, reject) {
    //     MongoClient.connect(url, function(err, db) {
    //         if (err) throw err;
    //         var dbo = db.db("SouvenirShop");

    //         dbo.collection("Souvenirs").find({}).toArray( function(err, result) {
    //             if (err) {
    //                 console.log(err);
    //                 return reject(err);
    //             }

    //             return resolve(result);
    //         })
    //     })
    // })
}

export const getProduct = async (id) => {

    db.collection("Souvenirs").find({"id": id}).toArray( function(err, result) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        })
        
    // return new Promise(function(resolve, reject) {
    //     MongoClient.connect(url, function(err, db) {
    //         if (err) throw err;
    //         var dbo = db.db("SouvenirShop");

    //         dbo.collection("Souvenirs").find({"id": id}).toArray( function(err, result) {
    //             if (err) {
    //                 console.log(err);
    //                 return reject(err);
    //             }
    //             return resolve(result);
    //         })
    //     })
    // })
}

// export const editProductInDB = async(id, newvalues) => {    //newValues like {$set: {address: "Canyon 123"} }

//     dbo.collection("Souvenirs").updateOne({id: "id"}, newvalues, function(err, res) {
//       if (err) throw err;
//       console.log("Document updated");
//     });
// }

// export const deleteProduct = async(id) => {

//     db.collection("Souvenirs").deleteOne({id: "id"}, function(err, obj) {
//         if (err) throw err;
//         console.log("Document deleted");
//     });
// }

// export const addProductInDB = async(values) => {

//     // db.collection("Souvenirs").instertOne( values, function(err, obj) {
//     //     if (err) throw err;
//     //     console.log("Document inserted");
//     // });

//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("SouvenirShop");
//         console.log("Connected");

//         dbo.collection("Souvenirs").insertOne( values, function(err, obj) {
//             if (err) throw err;
//             console.log("Document inserted");
//         });
//     });
// }