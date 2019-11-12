// caregando os modulos 
const express =require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const a = require('./Routers/admin')
const admin = require('./Routers/admin')
const path = require('path');
const session = require('express-session');
const flah = require('connect-flash')
require ('./Models/Postagen');
Postagem = mongoose.model('postagens');
require('./Models/Categoria');
const Categoria = mongoose.model('categorias');

// secao
app.use(session({
    secret:'crusonode',
    resave:true,
    saveUninitialized:true
}));
app.use(flah());
// Middleware
 app.use((req,res,nest) =>{
     res.locals.success_mgs = req.flash("success_msg");
     res.locals.test_msg = req.flash("test_msg");
     res.locals.erro_msg = req.flash("erro_msg");
     nest();    
 })
// condiguraçoes
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//handlebars
app.engine('handlebars',handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars');
// Mongosse
mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/blogappp',{
        useNewUrlParser:true,
        useUnifiedTopology: true}).then(()=>{
        console.log('Conectado ao Banco de dados');
    }).catch((erro)=>{
        console.log('Ocoreu um erro a se conectar com o banco ' + erro);
    })

//Public
app.use(express.static(path.join(__dirname,'public')))

app.get("/",(req,res)=>{
    Postagem.find().populate('categoria').sort('-date').then((postagens)=>{
        res.render("index",{postagens:postagens});
    })
    
})

app.get("/postagem/:slug",(req,res)=>{
    Postagem.findOne({slug:req.params.slug}).then((postagem)=>{
        if(postagem){
            res.render("postagem/index",{postagem:postagem})
        }
        else{
            req.flash("erro_msg"," Esta pagina não existe")
            res.redirect("/")
        }
    }).catch((err)=>{
        req.flash("erro_msg"," Ouve Um erro Interno ")
        res.redirect("/")
    })
})

app.get("/categoria",(req,res)=>{
    Categoria.find().then((categorias)=>{
        res.render("categoria",{categorias:categorias});
    })
})

app.get("/categoria/:slug",(req,res)=>{
    Categoria.findOne({slug:req.params.slug}).then((categoria)=>{
        
        if(Categoria){
            Postagem.find({categoria:categoria}).then((postagens)=>{
                res.render("categoria/index",{postagens:postagens,categoria:categoria});
            })
        }
        else{
            req.flash("erro_msg","Categoria Inexiste");
            res.redirect("/");
        }

    }).catch((erro)=>{
        req.flash("erro_msg","Ocorreu um erro interno" + erro);
        res.redirect("/");
    })
})

// rotas
app.use('/admin',admin);


//outros
const Port = 1350
app.listen(Port,()=>{
    console.log('Servido rodando na Porta ' + Port);
})