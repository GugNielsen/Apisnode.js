var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; /* this should be after passport*/
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

require("../Models/Usuario");
const Usuario = mongoose.model("usuarios");
module.exports = function(){
 passport.use(new LocalStrategy({usernameField:'email',passwordField:'senha'},(email,senha,done)=>{
   Usuario.findOne({email:email}).then((usuario)=>{
     if(!usuario){
       return done(null,false,{message:'essa conta nao existe'})
     }
     bcrypt.compare(senha,usuario.senha,(err,batem)=>{
       if(batem){
         return done(null,usuario);
        
       }
       else{
           return done(null,false,{message:'senha incoreta'})
      }
     });

   })
 }))

passport.serializeUser((usuario,done)=>{
  done(usuario,null);
})

passport.deserializeUser((id,done)=>{
  Usuario.findById(id,(err,usuario)=>{
    done(err,usuario)
  })
})

}


// module.exports = function(passport){
    
//     passport.use(new LocalStrategy({usernameField:'email',passwordField:'senha'},(email,senha,done)=>{
//       Usuario.findOne({email:email}).then((usuario)=>{
//         console.log(usuario);
//         if(!usuario){
//           return done(null,false,{message:'Usuario não cadastrado'})
//         }
//         bcrypt.compare(senha,usuario.senha,(err,batem)=>{
//           if(batem){
//             return done(null,usuario)
            
//           }
//           else{
//             return done (null,false,{message:'senha errada'})
//           }

//         })
//       })
//     }))

//     passport.serializeUer((usuario,done)=>{
//       done(null,usuario.id)
//     })

//     passport.deseriallizeUser((id,done)=>{
//       Usuario.findById(id,(err,usuario)=>{
//         done(err,usuario);
//       })
//     })

  //}

