const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express()
const PORT = 4000;

app.use(cors())
app.use(express.json())

const MONGODB_URI = 'your_mongoDB_connection_link_here' //for more infos check MongoDB\'s documentation

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('mongoose is connected !!')
})

const booksRouter = require("./routes/books")
app.use('/books', booksRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple API documentation",
		},
		servers: [
			{
				url: "http://localhost:4000",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

