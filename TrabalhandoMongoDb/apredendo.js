const mongoose = require("mongoose");
// Configurando o Mongoose
mongoose.connect('mongodb://localhost/Cadastro',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    }).then(()=>{
    console.log('Conectado com sucesso');
}).catch((erro)=> {
console.log('Houve um erro ao se conectar com o servidor ' + erro)
})

// Models 
const User = mongoose.Schema({
    nome:{
        type: String,
        require:true
    },
    sobrenome:{
        type:String,
        require:true

    },
    email:{
        type:String,
        require:true

    },
    pais:{
        type:String,
        require:false

    }
    

})
mongoose.model('users',User);

const user = mongoose.model('users')
new user({
    nome:"Gustavo",
    sobrenome:"Nielsen",
    email:"gusanielsen@gmail.com",
    pais:'Brasil'
}).save().then(function(){
    console.log('Usuario Registrado ')
})