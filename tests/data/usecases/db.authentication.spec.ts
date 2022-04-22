import { DbAuthentication } from "@/data/usecases";
import { mockAuthenticationParams } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { EncrypterSpy, HashComparerSpy, LoadAccountByEmailRepositorySpy, UpdateAccessTokenRepositorySpy } from "../mocks";

type SutTypes = {
    sut: DbAuthentication
    loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
    hashComparerSpy: HashComparerSpy
    encrypterSpy: EncrypterSpy
    updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
    const hashComparerSpy = new HashComparerSpy()
    const encrypterSpy = new EncrypterSpy()
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy() 
    const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
    const sut = new DbAuthentication(
        loadAccountByEmailRepositorySpy, 
        hashComparerSpy, 
        encrypterSpy, 
        updateAccessTokenRepositorySpy,
    )
    return { 
        sut,
        loadAccountByEmailRepositorySpy,
        hashComparerSpy,
        encrypterSpy,
        updateAccessTokenRepositorySpy,
    }
}

describe('DbAuthentication', () => {
    test('should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()

        await sut.auth(authenticationParams)

        expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email)
    })

    test('should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()
        jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)

        const promise = sut.auth(authenticationParams)

        expect(promise).rejects.toThrowError()
    })

    test('should return null if LoadAccountByEmailRepository returns null', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        loadAccountByEmailRepositorySpy.result = null
        const authenticationParams = mockAuthenticationParams()

        const response = await sut.auth(authenticationParams)

        expect(response).toBeNull()
    })

    test('should call HashComparer with correct email', async () => {
        const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()

        await sut.auth(authenticationParams)

        expect(hashComparerSpy.plaintext).toBe(authenticationParams.password)
        expect(hashComparerSpy.digest).toBe(loadAccountByEmailRepositorySpy.result.password)
    })
    
    test('should throw if HashComparer throws', async () => {
        const { sut, hashComparerSpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()
        jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)

        const promise = sut.auth(authenticationParams)

        expect(promise).rejects.toThrowError()
    })
    
    test('should call Encrypter with correct account id', async () => {
        const { sut, loadAccountByEmailRepositorySpy, encrypterSpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()

        await sut.auth(authenticationParams)

        expect(loadAccountByEmailRepositorySpy.result.id).toBe(encrypterSpy.plaintext)       
    })
    
    test('should throw if Encrypter throws', async () => {
        const { sut, encrypterSpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()
        jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)

        const promise = sut.auth(authenticationParams)

        expect(promise).rejects.toThrowError()       
    })
    
    test('should return access token and user name on success', async () => {
        const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()

        const result = await sut.auth(authenticationParams)

        expect(result).toStrictEqual({
            accessToken: encrypterSpy.ciphertext,
            name: loadAccountByEmailRepositorySpy.result.name
        })   
    })
    
    test('should call UpdateAccessTokenRepository with correct values', async () => {
        const { 
            sut, 
            encrypterSpy, 
            loadAccountByEmailRepositorySpy,
            updateAccessTokenRepositorySpy, 
        } = makeSut()
        const authenticationParams = mockAuthenticationParams()

        await sut.auth(authenticationParams)

        expect(loadAccountByEmailRepositorySpy.result.id).toBe(updateAccessTokenRepositorySpy.id)   
        expect(encrypterSpy.ciphertext).toBe(updateAccessTokenRepositorySpy.token)   
    })
    
    test('should throw if UpdateAccessTokenRepository throws', async () => {
        const { sut, updateAccessTokenRepositorySpy, } = makeSut()
        const authenticationParams = mockAuthenticationParams()
        jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken').mockImplementationOnce(throwError)

        const promise = sut.auth(authenticationParams)

        expect(promise).rejects.toThrowError() 
    })
})