const customerModel = require('../models/core/customer')

const login = ({username, password}) => {
    return customerModel.findOne({username, password})

}

module.exports = {
    login
}