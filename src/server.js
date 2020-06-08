const express = require("express")
const server = express()


// configurar pasta publica
server.use(express.static("public"))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurar caminhos da minha aplicação
// página inicial
// req = requisição
// res = resposta
server.get ("/" , (req, res) => {
    return res.render("index.html", { title: "Cadastre um ponto de coleta" })
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search.html")
})

// ligar o servidor
server.listen(3000)