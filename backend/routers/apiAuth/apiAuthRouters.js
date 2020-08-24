const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/UserModel/UserModel').UserModel;



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


// --------------------------users to be removed 
let refrestTokens = [];
// --------------------------above to be removed affter eb added


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
            refrestTokens.push(refreshToken)

            res.status(200).json({ accessToken: accessToken, refrestToken: refreshToken });
        } else {
            //wrong password
            return res.status(403).send("Wrong credentials.")
        }
    }) // ---> LOGIN


    // LOGOUT
    app.post('/logout', (req, res) => {
        // find token in db
        refrestTokens = refrestTokens.filter(token => token !== req.body.ref_token)
        res.sendStatus(204) // successfully deleted the token
    })


    // GENEREATE NEW ACCESS TOKEN IF OLD EXPIRED
    app.post('/token', (req, res) => {
        /*
            Generate new access token if old one is about to expire
            Use refresh token to check if access token should be created
        */
        const refrestToken = req.body.ref_token // get refrest token from request
        if (refrestToken == null) return res.sendStatus(401) // 401 unauthorized
        if (!refrestTokens.includes(refrestToken)) return res.sendStatus(403); // 403 fobriden
        // verify token
        jwt.verify(refrestToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403) // wrong token
            // create new access token
            const accessToken = generateAccessToken({ email: user.email })
            res.json({ accessToken: accessToken })
        })
    }) // ---> GENEREATE NEW ACCESS TOKEN IF OLD EXPIRED


}
