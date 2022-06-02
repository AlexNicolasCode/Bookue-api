import { MongoHelper, Note, NoteMongoRepository, User } from "@/infra";
import { mockLoadNotes, mockLoadNotesParams, mockNoteModel, mockUserModel } from "tests/domain/mocks";
import env from "@/env";

const makeSut = (): NoteMongoRepository => {
    return new NoteMongoRepository()
}

describe('NoteMongoRepository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.MONGO_URL)
    })

    beforeEach(async () => {
        await MongoHelper.deleteManyOn('note')
    })

    describe('add()', () => {
        test('should return undefined on success', async () => {
            const sut = makeSut()
            const fakeData = mockNoteModel()
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockUserModel())
    
            const result = await sut.add(fakeData)
    
            expect(result).toBeUndefined()
        })

        test('should call User model with correct values', async () => {
            const sut = makeSut()
            const fakeData = mockNoteModel()
            const userModelSpy = jest.spyOn(User, 'findOne')
            userModelSpy.mockResolvedValueOnce(mockUserModel())
    
            await sut.add(fakeData)
    
            expect(userModelSpy).toHaveBeenCalledWith({ accessToken: fakeData.accessToken })
        })
    })

    describe('loadAll()', () => {
        test('should call User model with correct values', async () => {
            const sut = makeSut()
            const fakeData = mockLoadNotesParams()
            const userModelSpy = jest.spyOn(User, 'findOne')
            userModelSpy.mockResolvedValueOnce(mockUserModel())

            await sut.loadAll(fakeData)

            expect(userModelSpy).toHaveBeenCalledWith({ accessToken: fakeData.accessToken })
        })

        test('should call Note model with correct values', async () => {
            const sut = makeSut()
            const fakeUser = mockUserModel() 
            const fakeRequest = mockLoadNotesParams()
            const noteModelSpy = jest.spyOn(Note, 'find')
            noteModelSpy.mockResolvedValueOnce([mockNoteModel()])
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(fakeUser)

            await sut.loadAll(fakeRequest)

            expect(noteModelSpy).toHaveBeenCalledWith({ 
                bookId: fakeRequest.bookId,
                userId: fakeUser.id,
            })
        })

        test('should return notes list on success', async () => {
            const sut = makeSut()
            const fakeData = mockLoadNotesParams()
            const fakeNotes = mockLoadNotes()
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockUserModel())
            jest.spyOn(Note, 'find').mockResolvedValueOnce(fakeNotes)

            const notes = await sut.loadAll(fakeData)

            expect(notes).toBe(fakeNotes)
        })
    })
})