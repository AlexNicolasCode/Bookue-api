import { HashComparer, Hasher } from "@/data/protocols";

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