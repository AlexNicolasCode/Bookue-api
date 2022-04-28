export interface CheckAccountByAccessTokenRepository {
    checkByAccessToken: (accessToken: string) => Promise<CheckAccountByAccessTokenRepository.Result>
}

export namespace CheckAccountByAccessTokenRepository {
    export type Result = boolean
  }