export const calculateDscount = (amount, discountPercentage) => Math.round( (amount - (discountPercentage/100)*amount) * 100 + Number.EPSILON ) / 100

export const deleteProduct = async (id) => {
   console.log("Deleting product2");
   if(confirm('Are you sure you want to delete item?')) {
     console.log("Deleting product");
     await deleteProductInDB(id);
   } else {
     return;
   }
 }