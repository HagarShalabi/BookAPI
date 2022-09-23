// /*Web server- Express.js & http*/
// const express=require("express");
// const morgan=require("morgan");

// const app=express();
// app.get("/", (request, response)=>{
//     response.status(200).json("Server running!");
// });

// const router=require("./route/books");
// app.use(morgan("dev"));
// app.use("/api/books", router);
// app.use(express.json()); /*Acts as a body parser*/

const http=require("http");
const app=require("./app");
const server=http.createServer(app);
const port=process.env.port||3000;
server.listen(port);
console.log("Server running at port 3000");
