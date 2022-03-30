const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const pool = require('../database');
/* 
    BASE URL /tasks
    GET / - Get all tasks
    POST / - Create a new task
    GET /:id - Get a task by id
    PUT /:id - Update a task by id
    DELETE /:id - Delete a task by id
*/
router.get('/', async (req, res, next) => {
    await pool
        .promise()
        .query('SELECT * FROM meeps')
        .then(([rows, fields]) => {
            res.render('meeps.njk', {
                meeps: rows,
                title: 'meeps',
                layout: 'layout.njk',
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                meeps: {
                    error: 'Error getting meeps',
                },
            });
        });
});

router.post('/', async (req, res) => {
    const meep = req.body.meep;

    await pool.promise()
    .query('INSERT INTO meeps (body) VALUES(?)', [meep])
    .then((response) => {
        if (response[0].affectedRows == 1) {
            res.redirect('/meeps');
        } else {
            res.status(400).json({
                meeps: {
                    error: 'Invalid meep'
                }
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            meeps: {
                error: 'Invalid meep'
            }
        })
    });
});


module.exports = router;

/*
    await pool
    .promise()
    .query('SELECT * FROM users')
    .then(([rows, fields]) => {
        res.json({
            data: rows,
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: 'Database error',
        });
    });
    */