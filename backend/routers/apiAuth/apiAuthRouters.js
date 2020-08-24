const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/UserModel/UserModel').UserModel;
const RefreshTokenModel = require('../../models/UserModel/UserModel').RefreshTokenModel;


// UTILS
function checkCredentials(req, res) {
    const { email, password } = req.body;

    // check login credentials
    if (password == null || email == null) {
        return res.status(400).send('Missing credentials')
    }
    return {
        "email": email,
        "password": password
    }
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}


// ROUTS :
module.exports = function (app) {
    // CREATE USER
    app.post('/signup', async (req, res) => {
        // check login credentials
        const { email, password } = checkCredentials(req, res);

        var salt = bcrypt.genSaltSync(10); // create salt
        var hashedPassword = bcrypt.hashSync(password, salt);

        // check if user already exists
        UserModel.exists({ email: email }, (err, result) => {
            if (result) return res.status(409).send('User with this email already exists')
        })
        // save user to db
        const user = new UserModel({
            email: email,
            password: hashedPassword
        })
        await user.save();

        const userSimplified = {
            email: user.email
        }

        res.status(201).send(userSimplified)
    }) // ---> CREATE USER 


    // LOGIN
    app.post('/login', async (req, res) => {
        // check login credentials
        const { email, password } = checkCredentials(req, res);

        // find user in db
        try {
            var user = await UserModel.findOne({ email: email })
            var userSimplified = {
                email: user.email
            }
        } catch (err) {
            return res.status(400).send("Can not find user with this email.")
        }

        // compare passwords
        if (bcrypt.compareSync(password, user.password)) {
            // LOGIN USER WITH JWT
            // Generate access token
            const accessToken = generateAccessToken(userSimplified);

            // Generate and save refresh token
            const refreshToken = jwt.sign(userSimplified, process.env.REFRESH_TOKEN_SECRET);
            const token = new RefreshTokenModel({ token: refreshToken });
            await token.save();

            res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
        } else {
            //wrong password
            return res.status(403).send("Wrong credentials.")
        }
    }) // ---> LOGIN


    // LOGOUT
    app.post('/logout', async (req, res) => {
        // find token in db
        try {
            await RefreshTokenModel.findOneAndDelete({ token: req.body.refreshToken })
            res.sendStatus(204) // successfully deleted the token
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }

    })


    // GENEREATE NEW ACCESS TOKEN IF OLD EXPIRED
    app.post('/token', async (req, res) => {
        /*
            Generate new access token if old one is about to expire
            Use refresh token to check if access token should be created
        */
        const refreshToken = req.body.refreshToken // get refresh token from request
        if (refreshToken == null) return res.sendStatus(401) // 401 unauthorized

        // lookup for tokens
        const token = await RefreshTokenModel.findOne({ token: refreshToken });

        if (token === null) return res.sendStatus(403); // 403 fobriden
        // test if token object is valid
        if (typeof token === 'object' && typeof token.token === 'string') {
            // verify token
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.sendStatus(403) // wrong token
                // create new access token
                const accessToken = generateAccessToken({ email: user.email })
                return res.json({ accessToken: accessToken })
            })
        } else {
            return res.sendStatus(500) // nothing else worked 
        }



    }) // ---> GENEREATE NEW ACCESS TOKEN IF OLD EXPIRED


}
