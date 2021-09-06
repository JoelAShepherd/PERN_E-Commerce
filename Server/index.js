const express = require('express')
const app = express();
const cors = require('cors');
const pool = require('./database/db');

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//GET products info
app.get('/products', async(req, res) => {
    console.log('Server recieves GET');
    try{
        const allProducts = await pool.query("SELECT * FROM products");
        res.json(allProducts.rows)

    } catch(err) {
        console.log(err.message)
    }
})


app.listen(5000, () => {
    console.log('Server has started on port 5000');
});