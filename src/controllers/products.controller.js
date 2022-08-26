import {getAllData, getProduct} from '../db.js'
//import {addProductInDB, editProductInDB} from '../db.js'

// Service for getting view with all products displayed
export const fetchProducts = async (req, res)  => {
    try {
        const tableData = await getAllData();

        res.render('productsList', { tableData });
    }
    catch(error) {
      console.log(error)
      res.send(500)
    }
}

export const fetchProduct = async (req, res)  => {
    try {
        let id = req.params.id
        const product = (await getProduct(id))[0];
    
        res.render('productEdit', { product });
    }
    catch(error) {
      console.log(error)
      res.send(500)
    }
}

// export const addProduct = async (req, res)  => {

//   var set = {
//     id: req.params.id,
//     name: req.params.name,
//     barCode: req.params.barcode,
//     color: req.params.color,
//     quantity: req.params.quantity,
//     productImageUrl: req.params.productImageUrl,
//     price: req.params.price
//   }
//   console.log(set);

//   await addProductInDB(set);
// }

// export const editProduct = async (req, res)  => {

//   var set = {
//     id: req.params.id,
//     name: req.params.name,
//     barCode: req.params.barcode,
//     color: req.params.color,
//     quantity: req.params.quantity,
//     productImageUrl: req.params.productImageUrl,
//     price: req.params.price
//   }
//   console.log(set);

//   await editProductInDB(set);
// }