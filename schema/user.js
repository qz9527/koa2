const sequelize = require('../libs/db')
const Sequelize = require('sequelize')

const Users = sequelize.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        defaultValue: 10
    }
}, {
    sequelize
})

module.exports = Users