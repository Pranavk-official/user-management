# Simple User Management System

A Node.js web application project with a user management system using Express and MongoDB.

> Live demo : [user-management](https://user-management-8fzd.onrender.com).
>> Hosted on [render.com](https://render.com)

## Features

### User Side:
- [x] Login
- [x] Register
- [x] View homepage with User Details
- [x] Generate Pokemon Cards on Home Page
- [x] Dragon Repeller Game
- [ ] Edit User Details (*except password*)
- [ ] Change Password (using otp ??)

### Admin Side:
- [x] Login
- [x] View User list
- [x] Search User
- [x] Add New User
- [x] Edit User Details (except password)
- [x] View User Details
- [x] Delete User
- [ ] View Admin Profile
- [ ] Block/Unblock User

### Security:
- User authentication implemented using Passport.js local strategy.
- Proper session control for users and admins.

## Getting Started

To get the project running on your local machine for development and testing purposes, please follow the instructions below.

### Prerequisites

You need to have Node.js, npm, and MongoDB installed on your machine. To install Node.js and npm, visit [Node.js](https://nodejs.org/). To install MongoDB, follow the instructions on [MongoDB](https://www.mongodb.com/).

### Installing

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repo-name.git
```

Navigate to the project directory:

```bash
cd your-repo-name
```

Install the necessary npm packages:

```bash
npm install
```

### Configuration

Create a `.env` file in the root directory and add the following:

```env
MONGODB_URI=`your_mongodb_url`
```

Replace `your_mongodb_url` with the connection string of your MongoDB database.

### Running the Application

Start the MongoDB server (if not already running):
> if your using mongodb in the local

```bash
mongod
```

Run the Node.js application:

```bash
npm start
```

> for running in dev mode
```bash
npm run dev
```

The application should now be running on [localhost:3000](http://localhost:3000/).


> Live demo : [user-management](https://user-management-8fzd.onrender.com).

## Built With

* [Node.js](https://nodejs.org/) - The JavaScript runtime
* [Express](https://expressjs.com/) - The web application framework
* [MongoDB](https://www.mongodb.com/) - The database
* [Passport.js](http://www.passportjs.org/) - Authentication middleware for Node.js

## Authors

* **Pranav K** - *Initial work* - [Pranavk-Official](https://github.com/Pranavk-Official)

