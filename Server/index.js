const express = require('express')
const app = express();
const cors = require('cors');
const pool = require('./database/db');



const PORT = 5000;

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//routes
const authRoutes = require('./routes/auth-routes')

app.use('/auth', authRoutes);


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