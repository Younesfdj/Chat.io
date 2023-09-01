const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a name"],
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
    }
},
    {
        timestamps: true
    }
)

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (notHashedPassword) {
    return await bcrypt.compare(notHashedPassword, this.password)
}

module.exports = mongoose.model('Users', UserSchema)