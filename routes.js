'use strict'

module.exports = function (app) {
    const user = require('./controller/user')
    const badge = require('./controller/badge')
    const userBadge = require('./controller/checkIn')
    const authToken = require('./controller/tokenKey')
    const location = require('./controller/location')
    // console.log("Mermaid")
    
    // app.get('/user', user.insert);
    app.post('/user', user.insert);
    app.post('/login', user.login);

    app.get('/test', userBadge.test)

    app.post('/badge', badge.insert)
    app.get('/badge', badge.show)
    app.delete('/badge/:id', badge.delete)
    app.patch('/badge/:id', badge.update)

    app.get('/userBadge', authToken, userBadge.badge )
    app.get('/allBadge', userBadge.allbadge )
    app.patch('/checkIn', authToken,  userBadge.checkIN)

    app.post('/location', location.insert)
    app.get('/location', location.show)
    app.delete('/location/:id', location.delete)
    app.patch('/location/:id', location.update)
}

