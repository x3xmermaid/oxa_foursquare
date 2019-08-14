const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token')
    if(!token){
        return res.status(401).json('Acces denied. No JWT provided')
    }

    try {
        const decoded = jwt.verify(token, 'tokenKey');
        req.user = decoded
        req.token = token
        next()
    }catch(err){
        res.status(400).json('Invalid JWT')
    }
}