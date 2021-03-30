const MidCustomer = require('../middlewares/AuthMiddleware')

const login = (req, res) => {   
    MidCustomer.login(req.body)
    .then(data => res.json({data}))
}

module.exports = {
    login
}