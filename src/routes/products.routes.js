import { Router } from "express";
import {fetchProduct, fetchProducts} from '../controllers/products.controller.js'
//import {addProduct, editProduct} from '../controllers/products.controller.js'

const router = Router();

router.get("/", fetchProducts);

router.get("/Edit/:id", fetchProduct);

// router.get("/Edit/:id", async function(req, res, next) {

//    editProduct(req, res);
// });

// router.get("/AddProduct", async function(req, res, next) {

//    res.render('productAdd');
// });

// router.post("/AddProduct", async function(req, res, next) {

//    addProduct(req, res);
// })

export default router;