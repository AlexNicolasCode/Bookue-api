import { DeleteBook } from "@/domain/usecases"
import { DeleteBookRepository } from "@/data/protocols"

export class DbDeleteBook implements DeleteBook {
    constructor (
        private readonly deleteBookRepository: DeleteBookRepository,
    ) {}

    async delete (data: DeleteBook.Params): Promise<void> {
        await this.deleteBookRepository.delete({
            userId: data.userId,
            bookId: data.bookId,
        })
    }
}