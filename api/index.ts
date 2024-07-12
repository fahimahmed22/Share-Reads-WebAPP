import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import * as path from 'path';  // Updated import syntax
import authController from '../controllers/authController';
import userController from '../controllers/userController';
import userBooklistController from '../controllers/userBooklistController';
import dashboardController from '../controllers/dashboardController';

// Initialize express app
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DB_CONNECTION);

app.get("/", authController.getLogin);
app.post("/", authController.postLogin);
app.get("/signup", authController.getSignup);
app.post("/signup", authController.postSignup);
app.get("/profile", userController.getUser);
app.post("/profile", userController.postUser);
app.get("/profileInfo", userController.getProfileInfo);
app.get("/booklist", userBooklistController.getBooks);
app.get("/welcome", userController.getWelcome);
app.get("/dashboard", dashboardController.getDashboard);
app.get("/viewDetails", dashboardController.getView);
app.post("/addBook", userBooklistController.addBook);
app.post("/deleteBook", userBooklistController.deleteBook);
app.post("/deletePhoto", userController.deletePhoto);
app.post("/welcome", userController.postWelcome);

app.listen(3300, function () {
    console.log("Server running at port 3300....");
});

