const Sequelize = require('sequelize');
    // coneção com Banco de dados 
    const sequelize = new Sequelize('postapp','root','vitoria123',{
        host:'localhost',
        dialect:'mysql'
    });

    module.exports = {
        Sequelize: Sequelize,
        sequelize: sequelize
    }