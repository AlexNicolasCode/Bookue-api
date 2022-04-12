import { Hasher } from "@/data/protocols";

export class HasherSpy implements Hasher {
    plaintext: string
    result: string
    
    async hash (plaintext: string): Promise<string> {
        this.plaintext = plaintext
        return this.result = plaintext + 'HASHED'        
    }
}