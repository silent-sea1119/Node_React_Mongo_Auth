const jwt = require('jsonwebtoken')

// UTILS
function authenticateToken(req, res, next) {
    /*
        Authenticate token and add user model to the req
        so it could be used
    */

    // check token from headres
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log(req.headers)
    console.log(req.headers['authorization'])

    if (token == null) return res.sendStatus(401); // token is missing
    // verify token and return user
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403) // fobridden access
        req.user = user;
        next();
    })
}


module.exports = function (app) {
    app.get('/restricted', authenticateToken, (req, res) => {
        const user = req.user; // created in authenticateToken
        res.status(200).json({
            ...user,
            message: "this is restricted"
        })
    })
}
