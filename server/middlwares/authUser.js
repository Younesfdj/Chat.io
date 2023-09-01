const { CustomError } = require('../errors/customError')
const jwt = require("jsonwebtoken")
const { StatusCodes } = require('http-status-codes')

module.exports.authUser = (req, res, next) => {
    const authHeader = req.headers.authorization
    try {
        if (!authHeader || !authHeader.startsWith('Bearer '))
            throw new CustomError("You are logged out, please log in first", StatusCodes.BAD_REQUEST)
        const authToken = authHeader.split(" ")[1]
        const { userID, username } = jwt.verify(authToken, process.env.JWT_SECRET)
        req.user = { userID, username }
        next()
    } catch (error) {
        res.status(error.errStatus || StatusCodes.BAD_REQUEST).json({ message: error.errMessage || error })
    }
}