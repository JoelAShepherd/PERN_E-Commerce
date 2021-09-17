const express = require('express')
const app = express();
const cors = require('cors');
const pool = require('./database/db');
const morgan = require('morgan')
const helmet = require('helmet')
const passport = require('passport');
const isGoogleAuthed = require('./middleware/google_auth')
const cookieSession = require('cookie-session')
require('dotenv').config();
require('./routes/SSO/passportGoogleSSO')

//routes
const authRoutes = require('./routes/auth-routes');
const dashboard = require('./routes/dashboard');
const googleRoutes = require('./routes/google-routes');





const PORT = process.env.port;

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use(helmet())

app.use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: [process.env.cookieKey],
    })
);

app.use(passport.initialize())
app.use(passport.session())

//ROUTES//


app.use('/auth', authRoutes);
app.use('/dashboard', dashboard);
app.use('/google', googleRoutes)


//GET products info
app.get('/products', isGoogleAuthed, async(req, res) => {
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