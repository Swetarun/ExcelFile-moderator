const express = require('express')
const route = require('./route/route')
const app = express()
const multer = require('multer')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(multer().any())

// middleware for counting the hits
let count=0;

function countMiddleware(req,res,next){
    count++;
console.log(count)
if(next)next();
}
app.use(countMiddleware);
app.use('/', route)

app.listen(process.env.PORT || 3000, function () {
    console.log("Express running on " + (process.env.PORT || 3000))
})