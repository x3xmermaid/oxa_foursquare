'use strict'

const con = require('../database/connect')

exports.insert = function (req, res) {
    const name = req.body.name

    con.query(
        `insert into location set name = ?`,
        [name],
        function (err, rows, field) {
            if (err) {
                res.status(400).json('insert location error')
            } else {
                return res.send({
                    data: rows,
                    message: "location has been saved"
                })
            }
        }
    )
}


exports.update = function (req, res) {
    const name = req.body.name
    const id = req.params.id

    con.query(
        `update location set name = ? where id = ?`,
        [name, id],
        function (err, rows, field) {
            if (err) {
                res.status(400).json('insert location error')
            } else {
                return res.send({
                    data: rows,
                    message: "location has been updated"
                })
            }
        }
    )
}


exports.delete = function (req, res) {
    const id = req.params.id

    con.query(
        `delete from location where id = ?`,
        [id],
        function (err, rows, field) {
            if (err) {
                res.status(400).json('delete location error')
            } else {
                return res.send({
                    data: rows,
                    message: "location has been deleted"
                })
            }
        }

    )
}

exports.show = function (req, res) {
    con.query(
        `select * from location`,
        function (err, rows, field) {
            if (err) {
                res.status(400).json('show location error')
            } else {
                return res.send({
                    data: rows,
                })
            }
        }

    )
}