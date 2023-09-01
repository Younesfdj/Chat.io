class CustomError extends Error {
    constructor(errMessage, errStatus) {
        super(errMessage)
        this.errStatus = errStatus
    }
}

module.exports = CustomError 