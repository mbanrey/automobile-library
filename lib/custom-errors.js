class DocumentNotFoundError extends Error {
    constructor () {
        super()
        this.name = 'DocumentNotFoundError'
        this.message = 'The ID you have provided does not match any documents'
    }
}
const handle404 = (document) => {
    if (!document) {
        throw new DocumentNotFoundError()
    } else {
        return document
    }
}

module.exports = {
    handle404
}