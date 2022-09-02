import { Router } from "express";
import {fetchProduct, fetchProducts} from '../controllers/products.controller.js'
import {addProduct, editProduct, deleteProduct} from '../controllers/products.controller.js'
import {validateData} from '../middleware/error-handling.js'

const router = Router();

router.get("/", async function(req, res, next) {

   await fetchProducts(req, res);
});

router.post("/", async function(req, res, next) {

   deleteProduct(req.body.id);
});

router.get("/Edit/:id", async function(req, res, next) {

   let product = await fetchProduct(req, res);
   let errMsg = "";
   let errParam = [];
   res.render('productEdit', {product, errMsg, errParam});
});

router.post("/Edit/:id", async function(req, res, next) {

   let product = await fetchProduct(req, res);

   let errMsg, errParam;
   try {
      let err = validateData(req, res);
      errMsg = err.errMsg;
      errParam = err.errParam;
      if(errMsg[0]) {
         throw(err);
      } else {
         await editProduct(req, res);
         res.redirect('/Edit/:id');
      }
   } catch(err) {
      console.log(err);
      res.render('productEdit', {errMsg, errParam, product});
   }
});

router.get("/AddProduct", async function(req, res, next) {

   let err = "";
   let product = {
      id: req.body.id,
      name:"",
      barCode: "",
      color: "",
      quantity: "",
      productImageUrl: "",
      price: ""
   }
   res.render('productAdd', {err});
});

router.post("/AddProduct", async function(req, res, next) {

   let errMsg, errParam;
   // let product = {
   //    id: req.body.id,
   //    name: req.body.name,
   //    barCode: req.body.barCode,
   //    color: req.body.color,
   //    quantity: req.body.quantity,
   //    productImageUrl: req.body.productImageUrl,
   //    price: req.body.price
   // }

   // req.body.name = undefined;
   // req.body.barCode = undefined;
   // req.body.color = undefined;

   try {
      let err = validateData(req, res);
      errMsg = err.errMsg;
      errParam = err.errParam;
      if(errMsg[0]) {
         throw(err);
      } else {
         await addProduct(req, res);
         res.redirect('/AddProduct');
      }
   } catch(err) {
      console.log(err);
      res.render('productAdd', {errMsg, errParam});
   }
})

// router.delete("/RemoveProduct", async function(req, res, next) {

//    console.log("U ruteru")
//    deleteProduct(req.body.id);
// });

router.get("/RemoveProduct/:id", async function(req, res, next) {

   deleteProduct(req.params.id);
   res.redirect("/")
});

export default router;