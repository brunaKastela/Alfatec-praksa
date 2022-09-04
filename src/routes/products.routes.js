import { Router } from "express";
import {fetchProduct, fetchProducts} from '../controllers/products.controller.js'
import {addProduct, editProduct, deleteProduct} from '../controllers/products.controller.js'
import {validateData} from '../middleware/error-handling.js'

const router = Router();

router.get("/", fetchProducts);

router.post("/", async function(req, res, next) {

   await fetchProducts(req, res);
});

router.get("/Edit/:id", async function(req, res, next) {

   let product = await fetchProduct(req, res);
   let errMsg = undefined;
   let errParam = undefined;
   res.render('productAdd', {errMsg, errParam, product});
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

   let errMsg = undefined;
   let errParam = undefined;
   res.render('productAdd', {errMsg, errParam});
});

router.post("/AddProduct", async function(req, res, next) {

   let errMsg, errParam;

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

router.get("/RemoveProduct/:id", async function(req, res, next) {

   deleteProduct(req.params.id);
   res.redirect("/")
});

export default router;