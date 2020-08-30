const express = require('express')
const app = express()
const port = 5000
const mongooese = require('mongoose')
mongooese.connect('mongodb+srv://yunmi:hohobanga6@boilerplate.2r0f9.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!!!!!!')
})

app.listen(port, () => { 
  console.log(`Example app listening at http://localhost:${port}`)
})



