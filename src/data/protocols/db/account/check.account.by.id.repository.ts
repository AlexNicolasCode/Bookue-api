export interface CheckAccountByIdRepository {
    checkById: (userId: string) => Promise<CheckAccountByIdRepository.Result>
}

export namespace CheckAccountByIdRepository {
    export type Result = boolean
  }