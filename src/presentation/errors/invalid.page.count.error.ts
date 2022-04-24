export class InvalidPageCountError extends Error {
    constructor () {
        super('Invalid page count')
        this.name = 'InvalidPageCountError'
    }
}
