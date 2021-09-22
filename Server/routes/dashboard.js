const router = require('express').Router();
const pool = require('../database/db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
    try{

        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user])
        res.json(user.rows[0]);

    } catch(err){
        console.log(err.message)
        res.status(500).json("Server Error")
    }
})

module.exports = router;

router.get('/orders', authorization, async(req, res)=> {
    try{
        const orderHistory = await pool
        .query("SELECT order_id, json_items_ordered FROM orders WHERE user_id = $1",
        [req.user])
        console.log('OH: ', orderHistory.rows[0])
        res.json(orderHistory.rows[0])
    } catch(err){
        console.log(err.message)
        res.status(500).json("Server Error On Order History")
    }
})