const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const routes = require('./routes')

const cors = require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(bodyParser.json())
routes(app)

app.listen(port)
console.log(port)
