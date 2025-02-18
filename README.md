# Trading App

The Trading app will serve as a platform where users can trade items with other users. Any user can post a trade and any other user can send offers for that trade. The offer may contain an equivalent value of cash and/or item/s.

The Trading app will consist of the following pages:

- Login
- Sign Up
- Home
- Browse
- My Profile
- Create Trade
- Create Offer
- Change Password
- Specific Trade

A Navbar will be shown on top of each page except Login and Sign Up.

### Sign Up

All users will need to sign up for the application with a unique username and password. The details need to be stored in MongoDB using Mongoose.
The username should be unique, and the user should be prompted to re-enter it if it is not.

### Login

The user should be able to log in using their username and password.

### Home

This will be the landing page of the website after logging in or signing up.

### Browse

This page will contain a list of all the **ongoing** trades.
The user should be able to:

- Filter through them by searching for keywords in the title using the search bar.
- Click on an auction which would navigate them to the Specific Trade page.

### My Profile

This page will show all the details of a user which include:

- Name
- Username
- List of trades they created
- List of trade offers they sent

Additionally they should also have an option to create a new trade as well as change their password. Both these options will navigate to the Create Auction and Change Password pages respectively.

### Create Trade

This page will allow the user to create a trade with the following details:

- Title
- Description
- List of Conditions (array os strings)

The auction will also have an additional field of **Accepted Trade** which will be updated when the user who posted the trade accepts an offer.
Details should be stored in MongoDB using Mongoose.

### Change Password

This page will be used to update a user's password stored in MongoDB.

### Specific Trade

This page will be opened when the user clicks on a trade on the Browse page. It will contain all the details of the trade (i.e., title, description, and conditions), and 

Users should be able to offer trades in real-time. There are 2 possible outputs of this screen:

1. The user who created the trade will see all offers coming in real-time. These offers will have the details as well as the Accept and Reject options. Upon accepting an offer, the trade should end for all connected users.
2. Any other user will have the option to send an offer.

This will use sockets.

Hints:

- You'll need to open a socket with the server when you navigate to this page and broadcast to any user connected to the same socket.
- Check out the socket.io documentation on how to create rooms.

## Details to Store in MongoDB

This is only a general overview of the data you will need to store. You can add more fields and arrange the models as you see fit.

- User
	- Username
	- Password
 	- No. of items owned
	- List of their created trades (reference to the Trade model)
- Trade
	- Title
	- Description
	- List of conditions (array of Strings)
    - List of offers (array of references to the Offer model)
    - Accepted Offer (reference to the Offer model)
- Offer
    - User who sent the offer
    - List of items offered
    - Cash offered
    - Trade offered for (reference to the Trade model)
