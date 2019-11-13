const express= require("express");
const router = express.Router();
const mongoose = require('mongoose');
require('../Models/Usuario');
const Usuario = mongoose.model('usuarios');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get("/registro",(req,res)=>{
   res.render("usuario/registro"); // const novoUsuario
    
})

router.post("/registro",(req,res)=>{
    var erro = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erro.push({texto:"Nome Invalido"});
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erro.push({texto:"senha Invalido"});
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erro.push({texto:"email Invalido"});
    }

    if(req.body.senha.length < 6){
        erro.push({texto:"Sua senha tem ser maior do que 6 caratires"});
    }

    if(req.body.nome.length < 2){
        erro.push({texto:"Seu nome é muito curto"});
    }

    if(req.body.senha != req.body.senha2){
        erro.push({texto:"senhas não são iguais"});
    }

    if(erro.length > 0){
        console.log({erro:erro});
        res.render("usuario/registro",{erro:erro}); 
    }
    else{
        Usuario.findOne({email:req.body.email}).then((usuario)=>{
            if(usuario){
                req.flash("erro_msg","email já registrado");
                res.redirect("/usuarios/registro")
            }
            else{
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                })
                bcrypt.genSalt(10,(erro,salt)=>{
                    bcrypt.hash(novoUsuario.senha,salt,(erro,hash)=>{
                        if(erro){
                            req.flash('erro_msg','Houve um erro em salver o Usuario')
                            res.redirect("/");
                        }
                        novoUsuario.senha =hash;
                        novoUsuario.save().then(()=>{
                            req.flash("test_msg","Usuario Criado com sucesso")
                            res.redirect("/");

                        }).catch((erro)=>{
                            req.flash("erro_msg","erro ao Criar o Usuario")
                            res.redirect("/");
                        })
                    })
                })               
            }

        }).catch((err)=>{
            req.flash("erro_msg","Erro Interno" + err);
            res.redirect("/");
        })

    }
})

router.get("/login",(req,res)=>{
    res.render('usuario/login');
})

router.post('/login',(req,res)=>{
    Usuario.findOne({email:req.body.email}).then((usuario)=>{
        if(!usuario){
            req.flash('erro_msg','Email não registrado')
            res.redirect('/')
        }
        else{
            bcrypt.compare(req.body.senha,usuario.senha,(err,batem)=>{
                if(batem){
                    req.flash('test_msg','Login efetuado com Sucesso')
                    res.redirect('/')
                }
                else{
                    req.flash('erro_msg','senha invalida')
                    res.redirect('/')
                }
            })
        }
        
    })
    
})


module.exports =router;

