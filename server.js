const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


server.get("/", async (req,res,next) => {
try{

 res.json(await db('accounts').select())
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