const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()


const Port = process.env.PORT
const db_link = process.env.DB_LINK

mongoose.connect(db_link)
.then(res =>{
  console.log("DB connect successfully")
}).catch(err => {
  console.log("DB connection failed")
}) 

const app = express()

app.use(express.json())

const TestSchema = new mongoose.Schema({
  name : String
})

const Test = mongoose.model('test', TestSchema)

app.use((req, res, next)=>{
  console.log("Working")
  next()
})

app.get('/', (req, res) => {
  Test.find()
  .then(Names =>{
    res.json({Names})
  })
  .catch(err=>{
    res.send("Something went wrong")
  })
})

app.post('/', (req, res) => {
  // console.log(req.body)
  const name = req.body.name
  Test.create({name: name})
  res.send("Name Added")
})

app.put('/', (req, res) => {
  res.send('Response for PUT request')
})

app.delete('/:id', (req, res) => {
  Test.findByIdAndDelete(req.params.id)
  .then(data =>{
    if(data){
      res.json({data})
      res.send("Deleted")
    }
    else{
      res.json({"message": "Name does not exist"})
    }
  })
  .catch(err =>{
    console.log(err)
    res.json({"message": "Something went wrong"})
  })
})


app.listen(Port, ()=>{
  console.log(`Server Started on http://localhost:${Port}`)
})