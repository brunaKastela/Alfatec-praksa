import {getAllData, getProduct, editProductInDB, deleteProductInDB, addProductInDB} from '../repository/db.repository.js'
import * as helper from '../helpers/helper.js' 
import {validateData} from '../middleware/error-handling.js'

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

    // console.log(req.query.filterBy);
    // console.log(req.query.filterValue);
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
    console.log(filterBy + " " + filterValue)
    if (filterValue) {

      fullTableData.forEach( function(item) {
        for(const property in item) {
          if(property == filterBy) {
            // console.log( item[property].toString().toLowerCase());
            // console.log(filterBy != 'price');
            // console.log(filterBy != 'quantity');
            // console.log(item[property].toString().toLowerCase().includes(filterValue.toString().toLowerCase()));
            if(filterBy != 'price' && filterBy != 'quantity' && item[property].toString().toLowerCase().includes(filterValue.toString().toLowerCase())) {
              tableData.push(item);
              console.log("Pushed")
            } else if ((filterBy == 'price' || filterBy == 'quantity') && filterValue == item[property]) {
              tableData.push(item);
              console.log("Pushed")
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

    //console.log(req.body.filterBy);
    //console.log(req.body.filterValue);
    //console.log(tableData);
    res.render('productsList', { tableData, 
                                pagesCount, 
                                page, 
                                filterBy,
                                filterValue});

    // const results = {}

    // if(endIndex < fullTableData.length) {
    //   results.next = {
    //     page: page + 1,
    //     limit: limit
    //   }
    // }

    // if(startIndex > 0) {
    //   results.previous = {
    //     page: page - 1,
    //     limit: limit
    //   }
    // }
}

export const fetchProduct = async (req, res)  => {
    try {
        let id = req.params.id

        const product = (await getProduct(id))[0];
        return product;
        let errMsg = [];
        let errParam = [];
        // res.render('productEdit', { product, errMsg, errParam });
    }
    catch(error) {;
      console.log(error)
      res.send(500);
    }
}

export const addProduct = async (req, res)  => {

  let id = helper.calculateID();
  //console.log(id);

  var set = {
    id: id,
    name: req.body.name,
    barCode: req.body.barCode,
    color: req.body.color,
    quantity: req.body.quantity,
    productImageUrl: req.body.productImageUrl,
    price: req.body.price
  }
  //console.log(set);

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
  //console.log(set);

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