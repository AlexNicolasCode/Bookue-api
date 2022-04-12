export class EmailAlreadyUsed extends Error {
    constructor (paramName: string) {
        super(`Email Already Used: ${paramName}`)
        this.name = 'EmailAlreadyUsed'
    }
} 