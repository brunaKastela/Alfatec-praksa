export const validateData = (req, res) => {

   // var errMsg = "";
   var errMsg = [];
   var errParam = [];

   if(/^ *$/.test(req.body.name)) {
      // if(errMsg != "") errMsg += '\n';
      // errMsg += "Name cannot be empty. ";
      errMsg.push("Name cannot be empty.");
      errParam.push('name');
   }

   if(!(/^[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}$/.test(req.body.barCode))) {
      // if(errMsg != "") errMsg += '\n';
      // errMsg += "Barcode must be in correct format. ";
      errMsg.push("Barcode must be in correct format.");
      errParam.push('barCode');
   }

   if(!(/^[a-zA-Z]+$/.test(req.body.color))) {
      // if(errMsg != "") errMsg += '\n';
      // errMsg += "Color cannot be empty or contain numbers and special characters. ";
      errMsg.push("Color cannot be empty or contain numbers and special characters.");
      errParam.push('color');
   } 

   if(!(/^\d+$/.test(req.body.quantity))) {
      // if(errMsg != "") errMsg += '\n';
      // errMsg.concat += "Quantity must be a number. ";
      errMsg.push("Quantity must be a number.");
      errParam.push('quantity');
   }

   if(!(/^\d+$/.test(req.body.price))) {
      // if(errMsg != "") errMsg += '\n';
      // errMsg += "Price must be a number. ";
      errMsg.push("Price must be a number.");
      errParam.push('price');
   }

   return {errMsg, errParam};
}