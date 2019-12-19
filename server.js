const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

// get accounts
server.get("/", async (req,res,next) => {
try{

 res.json(await db('accounts').select())
}
catch(err){
 next(err)
}
})

server.post("/", async (req,res,next) => {
 
 
 try{
 const data = {
  name: req.body.name,
  budget: req.body.budget
 }

  const [id] = await db('accounts').insert(data)
  res.json(await db("accounts").where("id",id).first())
 }
 catch(err){
  next(err)
 }
 })
server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Game Over",
	})
})



module.exports = server;