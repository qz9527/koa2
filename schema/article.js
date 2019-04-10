const sequelize = require('../libs/db')
const Sequelize = require('sequelize')
const User = require('./user')


const Articles = sequelize.define('Articles',{
    title: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    content: {
        type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},
    {
        freezeTableName: false,
        sequelize
    }
)

module.exports = Articles