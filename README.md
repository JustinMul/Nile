Buy/Sell Listing Website

An app where you can buy lovely plants. 


Buyer can register and login to our website.
In the home page buyers can see featured products.
Buyer can filter items by price, favorite items to check up on them later,
and send messages to the user that is listing the item.


Seller can post items, which can be seen by others
remove/edit items from the site
mark items as SOLD!
send a message via app, email, or text back on negotiations in buying the said item

## Screenshots
!["Screenshot of home page"](https://github.com/JustinMul/midterm/blob/master/docs/homepage.png)

!["Screenshot of home page"](https://github.com/JustinMul/midterm/blob/master/docs/login.png)

!["Screenshot of home page"](https://github.com/JustinMul/midterm/blob/master/docs/register.png)

!["Screenshot of home page"](https://github.com/JustinMul/midterm/blob/master/docs/addListing.png)

!["Screenshot of home page"](https://github.com/JustinMul/midterm/blob/master/docs/item-detail.png)


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- EJS
- pg
- body-parser
- cookie-session
- morgan
- node-sass-middleware

## Get started

- Create the .env by using .env.example as a reference: cp .env.example .env
- Update the .env file with your correct local information
- username: labber
- password: labber
- database: midterm
- Install dependencies: npm i
- Fix to binaries for sass: npm rebuild node-sass
- Reset database: npm run db:reset
- Check the db folder to see what gets created and seeded in the SDB
- Run the server: npm run local
- Note: nodemon is used, so you should not have to restart your server
- Visit http://localhost:8080/
