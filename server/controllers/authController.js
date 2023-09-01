const jwt = require("jsonwebtoken")
const { StatusCodes } = require('http-status-codes')
const UserSchema = require("../models/userModel")
const CustomError = require('../errors/customError')
require('dotenv')

const register = async (req, res) => {
    try {
        const { username, password } = req.body
        const findUser = await UserSchema.findOne({ username })
        if (!findUser) {
            const user = await UserSchema.create({ username, password })
            const token = jwt.sign({ userID: user._id, username: user.username }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXP
            })
            res.status(StatusCodes.ACCEPTED).json({
                user: user,
                token: token
            })
        }
        else
            throw new CustomError('User already exists', StatusCodes.BAD_REQUEST)
    } catch (error) {
        res.status(error.errStatus || 400).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await UserSchema.findOne({ username })
        if (!user)
            throw new CustomError("User doesn't exist", StatusCodes.NOT_FOUND)
        const correctPass = await user.comparePassword(password)
        if (!correctPass)
            throw new CustomError("Incorrect password", StatusCodes.BAD_REQUEST)
        const token = jwt.sign({ userID: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP
        })
        res.status(StatusCodes.ACCEPTED).json({
            user: {
                username: user.username,
                joined_at: user.createdAt,
                id: user._id
            },
            token: token
        })

    } catch (error) {
        res.status(error.errStatus || 400).json({ message: error.message })
    }
}

module.exports = { register, login }