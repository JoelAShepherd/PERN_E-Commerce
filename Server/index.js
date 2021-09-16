const express = require('express')
const app = express();
const cors = require('cors');
const pool = require('./database/db');

//routes
const authRoutes = require('./routes/auth-routes');
const dashboard = require('./routes/dashboard');




const PORT = 5000;

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//


app.use('/auth', authRoutes);
app.use('/dashboard', dashboard);


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


app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});