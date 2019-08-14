'use strict'

const jwt = require('jsonwebtoken')
const con = require('../database/connect')
const store = require('store')

exports.test = function (req, res) {
    return res.send("MErmaid")

}

exports.insert = function (req, res) {
    const email = req.body.email
    const pass = req.body.password
    con.query(
        `SELECT * from user where email=?`,
        [email],
        function (err, rows, field) {
            if (err) {
                res.status(400).json('email error')
            } else {
                console.log(rows)
                if (rows.length >= 1) {
                    return res.status(409).json('Email already registered')
                } else {
                    con.query('INSERT INTO user SET email = ?, password = ? ',
                        [email, pass],
                        function (err, rowUser, field) {
                            if (err) {
                                res.status(400).json('insert error')
                            } else {
                                con.query('INSERT into user_badge set user=?, level=0, total_checkin=0',
                                    [rowUser.insertId],
                                    function (err, rows) {
                                        if (err) {
                                            res.status(400).json('insert user_badge error')
                                        } else {
                                            return res.send({
                                                data_user: rowUser,
                                                data_userBadge: rows,
                                                message: "Data has been saved"
                                            })
                                        }
                                    })
                            }
                        })
                }
                console.log(rows)
            }
        }
    )
}

exports.login = function (req, res) {
    const email = req.body.email
    const pass = req.body.password
    // console.log(email)
    console.log(pass)
    con.query(
        `select user.id, user.email, user.password, user_badge.level, user_badge.total_checkin from user 
        inner join user_badge on user.id=user_badge.user
        where user.email = ? and user.password =?`,
        [email, pass],
        function (err, rows, field) {
            if (err) {
                res.status(400).json('login Error')
            } else {
                console.log(rows)
                if (rows.length >= 1) {
                    console.log(rows)
                    jwt.sign({ rows }, "tokenKey", (err, token) => {
                        res.status(200).json({
                            data_user: rows,
                            token_key: token
                        })
                    })
                    store.set('user_badge', {
                        level: rows[0].level,
                        total_checkin: rows[0].total_checkin
                    })
                } else {
                    res.status(403).json('Incorrect Email or Password')
                }
            }
        }
    )
}