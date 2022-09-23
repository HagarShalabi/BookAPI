const express=require("express");

const morgan=require("morgan");
const router=require("./routes/books");

const app=express();
app.use(express.json()); /*Acts as a body parser*/
app.use(morgan("dev"));
app.use("/api/books", router);

module.exports=app;
