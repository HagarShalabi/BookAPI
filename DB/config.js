exports.connect= async()=>{
    // mongodb://localhost:27017
    //OPEN CONNECTION
    const MongoClient=require("mongodb").MongoClient;
    const URL="mongodb://localhost:27017";
    const Client=new MongoClient(URL);
    await Client.connect();
    return Client;
}