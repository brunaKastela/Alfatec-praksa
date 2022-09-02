import {getAllData, getProduct, editProductInDB, deleteProductInDB, addProductInDB} from '../repository/db.repository.js'
import * as helper from '../helpers/helper.js' 


// Service for getting view with all products displayed
export const fetchProducts = async (req, res)  => {
    try {
        const tableData = await getAllData();
        
        res.render('productsList', { tableData, helper});
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
        return product;
        //res.render('productEdit', { product });
    }
    catch(error) {
      console.log(error)
      res.send(500)
    }
}

export const addProduct = async (req, res)  => {

  let id = helper.calculateID();
  console.log(id);

  var set = {
    id: id,
    name: req.body.name,
    barCode: req.body.barCode,
    color: req.body.color,
    quantity: req.body.quantity,
    productImageUrl: req.body.productImageUrl,
    price: req.body.price
  }
  console.log(set);

  await addProductInDB(set);
  res.redirect('/');
}

export const editProduct = async (req, res)  => {

  let id = req.params.id;
  var set = {
    id: id,
    name: req.body.name,
    barCode: req.body.barCode,
    color: req.body.color,
    quantity: req.body.quantity,
    productImageUrl: req.body.productImageUrl,
    price: req.body.price
  }
  console.log(set);

  await editProductInDB(id, set);
  res.redirect('/');
}

export const deleteProduct = async (id) => {

  console.log("Deleting product");
  await deleteProductInDB(id);
}

// export const editOrAddProduct = async (req, res)  => {

//   let id;
//   if(req.params.id)
//     id = req.params.id;

//     var set = {
//     id: req.body.id,
//     name: req.body.name,
//     barCode: req.body.barCode,
//     color: req.body.color,
//     quantity: req.body.quantity,
//     productImageUrl: req.body.productImageUrl,
//     price: req.body.price
//   }
//   console.log(set);

//   await editOrAddProductInDB(id, set);
//}