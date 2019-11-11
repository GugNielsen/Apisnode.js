var http = require("http");
const port =7777

http.createServer(function(req,res) {
     res.end("Gustavo Nielsen esta aqui");
}).listen(port);

console.log("Servidor rodando na porta " + port);