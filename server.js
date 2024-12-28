const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Response for GET request')
})

app.post('/', (req, res) => {
  res.send('Response for POST request')
})

app.put('/', (req, res) => {
  res.send('Response for PUT request')
})

app.delete('/', (req, res) => {
  res.send('Response for DELETE request')
})


app.listen(4004, ()=>{
  console.log("Server Started")
})