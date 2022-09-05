import {getAllData, getProduct, editProductInDB, deleteProductInDB, addProductInDB} from '../repository/db.repository.js'
import * as helper from '../helpers/helper.js' 

const limit = 10;

// Service for getting view with all products displayed
export const fetchProducts = async (req, res)  => {

    let fullTableData;
    try {
        fullTableData = await getAllData(req);
    }
    catch(error) {
      console.log(error)
      res.send(500)
    }

    let page = 1;
    if(req.query.page) {
      page = parseInt(req.query.page);
    }

    let tableData = [];
    let filterBy = undefined;
    let filterValue = undefined;

    if(req.query.filterBy || req.query.filterValue) {
      filterBy = req.query.filterBy;
      filterValue = req.query.filterValue;
    }

    if(req.body.filterBy || req.body.filterValue) {
      filterBy = req.body.filterBy;
      filterValue = req.body.filterValue;
    }

    if (filterValue) {

      fullTableData.forEach( function(item) {
        for(const property in item) {
          if(property == filterBy) {
            if(filterBy != 'price' && filterBy != 'quantity' && item[property].toString().toLowerCase().includes(filterValue.toString().toLowerCase())) {
              tableData.push(item);
            } else if ((filterBy == 'price' || filterBy == 'quantity') && filterValue == item[property]) {
              tableData.push(item);
            } 
          }
        }
      })
    } else {
      tableData = fullTableData;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let pagesCount;

    if(tableData.length != 0) {
      pagesCount = Math.ceil(tableData.length / limit);
      tableData = tableData.slice(startIndex, endIndex);
    } else {
      pagesCount = 1;
    }

    res.render('productsList', { tableData, 
                                pagesCount, 
                                page, 
                                filterBy,
                                filterValue});
}

export const fetchProduct = async (req, res)  => {
    try {
        let id = req.params.id

        const product = (await getProduct(id))[0];
        return product;
    }
    catch(error) {;
      console.log(error)
      res.send(500);
    }
}

export const addProduct = async (req, res)  => {

  let id = helper.calculateID();

  var set = {
    id: id,
    name: req.body.name,
    barCode: req.body.barCode,
    color: req.body.color,
    quantity: req.body.quantity,
    productImageUrl: req.body.productImageUrl,
    price: req.body.price
  }

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

  await editProductInDB(id, set);
  res.redirect('/');
}

export const deleteProduct = async (id) => {

  console.log("Deleting product");
  await deleteProductInDB(id);
}