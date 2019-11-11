const mongoose = require("mongoose");
const Schema = mongoose.Schema;

Postagen = new Schema({
    titulo:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        require:true
    },
    descrption:{
        type:String,
        required:true

    },
    contuedo:{
        type:String,
        required:true
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:"categorias",
        required:true
    },
    data:{
        type:Date,
        default: Date.now() 
    }
})
mongoose.model('postagens',Postagen);