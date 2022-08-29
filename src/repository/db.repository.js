import dbInstance from "../db.js";

export const getAllData = async () => {

   var _db = dbInstance();

   return new Promise(function(resolve, reject) {

      _db.collection("Souvenirs").find().toArray( function(err, result) {
       if (err) {
         console.log(err);
         return reject(err)
       }

       return resolve(result)
     })
   })
}

export const getProduct = async (id) => {

   var _db = dbInstance();

   return new Promise(function(resolve, reject) {

      _db.collection("Souvenirs").find({"id": id}).toArray( function(err, result) {
         if (err) {
            console.log(err);
            throw err;
         }

         return resolve(result)
     })
   })
}

export const editProductInDB = async(id, newvalues) => {

   var _db = dbInstance();

   return new Promise(function(resolve, reject) {

      _db.collection("Souvenirs").updateOne({"id": id}, {$set: newvalues}, function(err, res) {
         if (err) {
            console.log(err);
            throw err;
         }

         console.log("Document updated");
     })
   })
}

export const deleteProductInDB = async(id) => {

   var _db = dbInstance();

   return new Promise(function(resolve, reject) {
 
      _db.collection("Souvenirs").deleteOne({"id": id}, function(err, result) {
         if (err) {
            console.log(err);
            throw err;
         }
 
         console.log("Document deleted");
     })
   })
}

export const addProductInDB = async(values) => {

   var _db = dbInstance();

   return new Promise(function(resolve, reject) {

      _db.collection("Souvenirs").insertOne( values, function(err, result) {
         if (err) {
            console.log(err);
            throw err;
         }

         console.log("Document inserted");
     })
   })
}