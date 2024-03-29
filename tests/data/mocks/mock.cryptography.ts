import { faker } from "@faker-js/faker"

import { Decrypter, Encrypter, HashComparer, Hasher } from "@/data/protocols"

export class HasherSpy implements Hasher {
    plaintext: string
    result: string
    
    async hash (plaintext: string): Promise<string> {
        this.plaintext = plaintext
        return this.result = plaintext + 'HASHED'        
    }
}

export class HashComparerSpy implements HashComparer {
    plaintext: string
    digest: string
    isValid = true
    
    async compare (plaintext: string, digest: string): Promise<boolean> {
        this.plaintext = plaintext
        this.digest = digest
        return this.isValid    
    }
}

export class EncrypterSpy implements Encrypter {
    ciphertext = faker.datatype.uuid()
    plaintext: string
    
    async encrypt (plaintext: string): Promise<string> {
        this.plaintext = plaintext
        return this.ciphertext
    }
}

export class DecrypterSpy implements Decrypter {
    plaintext = faker.internet.password()
    ciphertext: string
    
    async decrypt (ciphertext: string): Promise<string> {
        this.ciphertext = ciphertext
        return this.plaintext
    }
}