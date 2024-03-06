const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/calculatorDB', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) { return done(err); }
            if (!user || !bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    })
);

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Add your existing calculator and history-related routes here

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
