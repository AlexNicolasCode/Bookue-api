export class EmailAlreadyUsed extends Error {
    constructor () {
        super(`Email Already Used`)
        this.name = 'EmailAlreadyUsed'
    }
} 