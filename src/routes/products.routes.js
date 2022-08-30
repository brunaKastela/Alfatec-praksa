import { Router } from "express";
import {fetchProduct, fetchProducts} from '../controllers/products.controller.js'
import {addProduct, editProduct, deleteProduct} from '../controllers/products.controller.js'

const router = Router();

router.get("/", fetchProducts);

router.post("/", async function(req, res, next) {

   deleteProduct(req.body.id);
});

router.get("/Edit/:id", async function(req, res, next) {

   let product = {
      id:  '',
      name:'',
      barCode: '',
      color: '',
      quantity: '',
      productImageUrl: '',
      price: ''
    };
   res.render('productEdit', {product});
});

router.post("/Edit/:id", async function(req, res, next) {

   await editProduct(req, res);
});

router.get("/AddProduct", async function(req, res, next) {

   res.render('productAdd');
});

router.post("/AddProduct", async function(req, res, next) {

   await addProduct(req, res);
})

router.delete("/RemoveProduct", async function(req, res, next) {

   console.log("U ruteru")
   deleteProduct(req.body.id);
});

router.get("/RemoveProduct/:id", async function(req, res, next) {

   console.log("U ruteru")
   deleteProduct(req.params.id);
   res.redirect("/")
});

export default router;