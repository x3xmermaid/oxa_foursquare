'use strict'

const con = require('../database/connect')

exports.insert = function (req, res){
    const name = req.body.name
    const check_in = req.body.check_in
    const level = req.body.level
    let same = false

    con.query(
        `select * from badge`,
        function (err, rows, field) {
            if(err){
                res.status(400).json('badge error')
            }else{
               for(let i = 0; i<rows.length; i++){
                    if(rows[i].name == name){
                        res.status(409).json('Name already used')
                        same = true
                    }else if(rows[i].check_in == check_in){
                        res.status(409).json('total check in already used')
                        same = true
                    }else if(rows[i].level == level){
                        res.status(409).json('level already used')
                        same = true
                    }
               }
               if(same == false){
                con.query(
                    `insert into badge set name = ?, check_in = ?, level = ?`,
                    [name, check_in, level],
                    function (err, rows, field) {
                        if(err){
                            res.status(400).json('insert badge error')
                        }else{
                            return res.send({
                                data: rows,
                                message: "Badge has been saved"
                            })
                        }
                      }
                )
               }
            }
          }
    )
}

exports.update = function (req, res){
    const name = req.body.name
    const check_in = req.body.check_in
    const level = req.body.level
    const id = req.params.id
    let same = false

    con.query(
        `select * from badge where id <> ?`,
        [id],
        function (err, rows, field) {
            if(err){
                res.status(400).json('badge error')
            }else{
               for(let i = 0; i<rows.length; i++){
                    if(rows[i].name == name){
                        res.status(409).json('Name already used')
                        same = true
                    }else if(rows[i].check_in == check_in){
                        res.status(409).json('total check in already used')
                        same = true
                    }else if(rows[i].level == level){
                        res.status(409).json('level already used')
                        same = true
                    }
               }
               if(same == false){
                con.query(
                    `update badge set name = ?, check_in = ?, level = ? where id = ?`,
                    [name, check_in, level, id],
                    function (err, rows, field) {
                        if(err){
                            res.status(400).json('insert badge error')
                        }else{
                            return res.send({
                                data: rows,
                                message: "Badge has been updated"
                            })
                        }
                      }
                )
               }
            }
          }
    )
}

exports.delete = function (req, res){
    const id = req.params.id

    con.query(
        `delete from badge where id = ?`,
        [id],
        function(err, rows, field){
            if(err){
                res.status(400).json('delete badge error')
            }else{
                return res.send({
                    data: rows,
                    message: "Badge has been deleted"
                })
            }
        }
        
    )
}

exports.show = function (req, res){
    con.query(
        `select * from badge`,
        function(err, rows, field){
            if(err){
                res.status(400).json('show badge error')
            }else{
                return res.send({
                    data: rows,
                })
            }
        }
        
    )
}