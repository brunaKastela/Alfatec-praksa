export const deleteProduct = async (id) => {
   console.log("Deleting product2");
   if(confirm('Are you sure you want to delete item?')) {
     console.log("Deleting product");
     await deleteProductInDB(id);
   } else {
     return;
   }
 }

export const calculateID = () => {
  return (Math.floor(Math.random() * 9000000000) + 1000000000).toString();
}