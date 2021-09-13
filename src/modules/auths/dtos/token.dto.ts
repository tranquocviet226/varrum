export interface TokenDto {
  tokenType: string
  accessToken: string
  accessTokenExpires: number
  refreshToken: string
}

export interface VerifyTokenDto {
  verifyToken: string
  verifyTokenExpires: number
}
