const { request } = require("express")
const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

// definido handlebars como template engine 
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

// pasta de arquivos estáticos como CSS, imagens
app.use(express.static("public"))

// trabalhar com dados no formato json
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

// rotas
app.post("/register/save", (request, response)=>{
    const { title, pageqly } = request.body

    const query = `
    INSERT INTO books (title, pageqly)
    VALUES ('${title}', '${pageqly}')
    `
    conn.query(query, (error) =>{
        if (error){
            console.log(error)
            return
        }

        response.redirect("/")
    })
})

app.get("/register", (request, response) => {
    response.render("register")
   
})


app.get("/", (request, response) => {

    const sql = 'SELECT * FROM books'

    conn.query(sql, (error, data) => {
        if (error) {
        return console.log(error)
    }

    const books = data

    console.log(books)

    response.render("home", { books })
})
})

// conexão com mySQL

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3306
})

conn.connect((error) => {
    if (error) {
        console.log(error)
        return
    }

    console.log("Conectado ao MySQL!")

    app.listen(3000, () =>{
        console.log("Servidor rodando na porta 3000!")
    })
})