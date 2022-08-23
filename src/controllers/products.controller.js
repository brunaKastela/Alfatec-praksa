import {getAllData} from '../db.js'

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