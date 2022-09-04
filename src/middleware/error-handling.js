export const validateData = (req, res) => {

   var errMsg = [];
   var errParam = [];

   if(/^ *$/.test(req.body.name)) {
      errMsg.push("Name cannot be empty.");
      errParam.push('name');
   }

   if(!(/^[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}$/.test(req.body.barCode))) {
      errMsg.push("Barcode must be in correct format.");
      errParam.push('barCode');
   }

   if(!(/^[a-zA-Z]+$/.test(req.body.color))) {
      errMsg.push("Color cannot be empty or contain numbers and special characters.");
      errParam.push('color');
   } 

   if(!(/^\d+$/.test(req.body.quantity))) {
      errMsg.push("Quantity must be a number.");
      errParam.push('quantity');
   }

   if(!(/^\d+$/.test(req.body.price))) {
      errMsg.push("Price must be a number.");
      errParam.push('price');
   }

   return {errMsg, errParam};
}