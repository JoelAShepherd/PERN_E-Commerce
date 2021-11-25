# PERN E-commerce webapp - Client
This is the client side React webapp part of my PERN E-Commerce project for the Codecademy Full Stack Developer course.

## Functionality
The homepage requests the products available from the Postgres DB using the Express server and displays them. Items can then be added to the cart, with the header displaying the total number and cost of all items in the cart. Items can be added to the cart from either the homepage or an individual product page. In order to proceed with the transaction, a user must first login or register, with user details being stored in the db. If details are correct/valid then a JWT is recieved and stored in the browser for 1hr. Once logged in the transaction can be completed using the Stripe payment process, here deployed in test mode. Once the "payment" has been processed, the user is redirected to their dashboard where their previous orders are displayed.
This part of the project functions as a submodule within the server side part of the project, which can be seen [here](https://github.com/JoelAShepherd/PERN_server).

## Deployment
This project has been deployed on [Heroku](https://www.heroku.com) at https://pern-webapp-server.herokuapp.com/.

## Technologies
* React
* Redux
* Stripe
* Passport
* Toastify
* Webpack

## Further Development
* CSS improvements for mobile device veiwing
* Add address form to transaction process
* Setup homepage such that if there were a large number of products only a number would be displayed but the rest navigated to using next/previous buttons


## Contributing
Pull requests are welcome.