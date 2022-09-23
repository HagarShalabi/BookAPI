const bookValidation=require('../validation/books');
const DBSetUp=require('../DB/config');
const { ObjectId } = require('mongodb');
exports.add= async (request, response)=>{
        //EXTRACTION
        const {title, author, price}=request.body;
        
       //VALIDATION
       const validFlag= bookValidation.validFlag(title, author, price);
       if(!validFlag) return response.status(400).json("Error in validation");
      
       //DUPLICATION
       const Client=await DBSetUp.connect();
       const creatingDB=Client.db("books");
       const booksCollection=creatingDB.collection("books"); //Table= Collection
      
       const book=await booksCollection.findOne({title:title});

       if(book) return response.status(400).json("Duplication error");
       else{
        //INSERTED
        const insertedValue=await booksCollection.insertOne({title, author, price})
       if(insertedValue.insertedId)  return response.status(200).json("Field inserted");
        else return response.status(400).json("Server error");
    }
}
//////DONT FORGET PROMISE FUNCTION PAIR ASYNC AND AWAIT/////////////
    exports.select=async (request, response)=>{
 const Client=await DBSetUp.connect();
 const creatingDB=Client.db("books");
 const booksCollection=creatingDB.collection("books"); //Table= Collection
  
 const curser = await booksCollection.find();
 const view=await curser.toArray();
      return response.status(200).json(view);
}

exports.update=async (request, response)=>{
    //EXTRACTION
const {title, author, price}=request.body;
const id=request.params;
    //VALIDATION
const validFlag= bookValidation.validFlag(title, author, price);
if(!validFlag) return response.status(400).json("Error in validation");

    //DUPLICATION
const Client=await DBSetUp.connect();
const creatingDB=Client.db("books");
const booksCollection=creatingDB.collection("books"); //Table= Collection
const book=await booksCollection.findOne({title});
if(book)  
      return response.status(400).json("Copied data");

    //REPLACE=REPLACE WHOLE DOCUMENT, UPDATE (set)=REPLACE SPECIFIED 
const updateResult= await booksCollection.findOneAndUpdate({_id:ObjectId(id)}, 
                                                    {$set:{title, author, price}})
if(updateResult.value) return response.status(200).json("Field updated");
    else return response.status(400).json("Server error");
}

exports.delete=async (request, response)=>{
    //EXTRACTION
const {title, author, price}=request.body;
const id=request.params;

    //DUPLICATION
const Client=await DBSetUp.connect();
const creatingDB=Client.db("books");
const booksCollection=creatingDB.collection("books"); //Table= Collection
const book=await booksCollection.findOne({title});
if(book)  
      return response.status(400).json("Copied data");

    //REPLACE=REPLACE WHOLE DOCUMENT, UPDATE (set)=REPLACE SPECIFIED 
const deleteValue= await booksCollection.deleteOne({_id:ObjectId(id)});
if(deleteValue.deletedCount) return response.status(200).json("Field deleted");
    else return response.status(400).json("Server error");
}
