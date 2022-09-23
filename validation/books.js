
 const joi=require("joi");
 exports.validFlag=(title, author, price)=>{

  //JOI VALIDATION
 const bookSchema=joi.object({
    title: joi.string().min(3).max(50).required(), 
    author: joi.string().min(3).max(50).required(), 
    price: joi.number().min(50).max(1000),
})
const validation=bookSchema.validate({title, author, price});
if(validation.error){
    console.log(validation.error);
    response.status(400).json("Invalid data");
    return 0;
}
return 1;
 };