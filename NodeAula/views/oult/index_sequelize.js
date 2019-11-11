const express = require('express');
const app = express();
const port = 5000;
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./Models/post')


//Config 
    // templete engine
  var a =  app.engine('handlebars',handlebars({defaultLayout:'main'}));
   var b = app.set('view engine','handlebars');
   // configura BodyParser
   app.use(bodyParser.urlencoded({extended:false}));
   app.use(bodyParser.json());


    // Rotas
    app.get('/',function(req,res){
       Post.findAll({order:[['id','ASC']] }).then(function(pst){
           res.render('home',{pst:pst})
          // console.log(pst);
       })
        
    });

    app.get('/cad',function(req,res){
        //('Rota Funcionando');
        res.render('formulario');
    });

    app.post('/add',function(req,res){
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function(){
            res.redirect('/');
        }).catch(function(erro){
            res.send('Ocorreu um erro ' + erro);
        })
    });

    app.get('/del/:id',function(req,res){
        Post.destroy({where:{'id': req.params.id}}).then(function(){
            res.send('Delatado Com Sucesso');
        }).catch(function(erro){
            res.send('Ocoreu um erro');
        })
    })

// localhost:5000
app.listen(port,function () {
    console.log("Servidor Rodando na Porta " + port);
});

//app.configure, app.use etc
