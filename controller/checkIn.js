'use strict'

const con = require('../database/connect')
let store = require('store')

exports.checkIN = function (req, res) {
    let user_badge = store.get('user_badge')

    if(user_badge == undefined){
        return res.send({
            Message: "Maaf sesi anda sudah habis silahkan login kembali"
        })
    }

    const id = req.user.rows[0].id
    let level = req.user.rows[0].level
    const total_checkin = req.user.rows[0].total_checkin
    const id_location = req.body.id_location
    con.query(`select * from user_checkin where user=? and location=? and date=current_date`,
    [id, id_location],
    function(err, rows){
        if(err){
            res.status(400).json('select user_checkin error')
        }else{
            if(rows.length >= 1){
                return res.send({
                    Message: "Maaf hari ini anda sudah melakukan check in di lokasi ini"
                })
            }else{
                con.query(`insert into user_checkin set user=?, location=?, date=now()`,
                [id, id_location],
                function(err, rowsInsert){
                    if(err){
                        res.status(400).json('insert user_checkin error')
                    }else{
                        con
                        con.query(`select * from badge where level = ?`,
                        [user_badge.level+1],
                        function(err, rows){
                            if(err){
                                res.status(400).json('select badge error')
                            }else{
                                console.log(rows)
                                let total = user_badge.total_checkin+1
                                if(user_badge.total_checkin+1 >= rows[0].check_in){
                                    level = user_badge.level+1
                                }
                                console.log(id)
                                con.query(`update user_badge set level = ?, total_checkin = ? where user = ? `,
                                [level, user_badge.total_checkin+1, id],
                                function(err, rows){
                                    if(err){
                                        res.status(400).json('update user_badge error')
                                    }else{
                                        store.set('user_badge', {
                                            level: level,
                                            total_checkin: total
                                        })
                                        return res.send({
                                            data_insert: rowsInsert,
                                            data_update: rows,
                                            message: "user badge has been updated"
                                        })
                                    }
                                })
                            }
                        }
                        )
                    }
                })
            }
        }
    })
}

exports.badge = function (req, res) {
    const id = req.user.rows[0].id
    console.log(id)
    con.query(
        `select user.id, user.email, user_badge.level, badge.name as badge_level, user_badge.total_checkin 
        from user 
        inner join user_badge on user.id=user_badge.user
        inner join badge on user_badge.level=badge.level
        where user.id=?`,
        [id],
        function(err, rows, field){
            if(err){
                res.status(400).json('Select user error')
            }else{
                return res.send({
                    data: rows,
                })
            }
        }
    )
}

exports.allbadge = function (req, res) {
    con.query(
        `select user.id, user.email, user_badge.level, badge.name as badge_level, user_badge.total_checkin 
        from user 
        inner join user_badge on user.id=user_badge.user
        inner join badge on user_badge.level=badge.level`,
        function(err, rows, field){
            if(err){
                res.status(400).json('Select user error')
            }else{
                return res.send({
                    data: rows,
                })
            }
        }
    )
}

exports.test = function (req, res) {
    // var store = storage('path/to/file')
    let data = store.get('user_badge')
    console.log(data.level)
    store.set('user', { name:'new' })

    return res.send({
        data: data,
    })

}