export enum ErrorType {
  // Common
  INTERNAL_SERVER = 'INTERNAL_SERVER',
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
  NOT_FOUND = 'NOT_FOUND',
  // Auth
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_EXPIRED',
  REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
  VERIFY_TOKEN_ERROR = 'VERIFY_TOKEN_ERROR',
  ACTIVATED_EMAIL = 'ACTIVATED_EMAIL',
  BLOCKED_EMAIL = 'BLOCKED_EMAIL',
  // User
  USER_EXISTS = 'USER_EXISTS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  EMAIL_NOT_EMPTY = 'EMAIL_NOT_EMPTY',
  VERIFY_CODE_RESET_PASS_NOT_EMPTY = 'VERIFY_CODE_RESET_PASS_NOT_EMPTY',
  CODE_EXPIRED = 'CODE_EXPIRES',
  INVALID_CODE = 'INVALID_CODE',
  VERIFY_CODE_RESET = 'VERIFY_CODE_RESET',
  PHONE_EXISTS = 'PHONE_EXISTS',
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  AVATAR_ID_NOT_FOUND = 'AVARTAR_ID_NOT_FOUND',
  // Role
  ROLE_DOES_NOT_EXISTS = 'ROLE_DOES_NOT_EXISTS',
  BLOCKED_USER = 'BLOCKED_USER',
  INACTIVE_USER = 'INACTIVE_USER',
  PermissionExists = 'PERMISSION_EXISTS',
  RoleExists = 'ROLE_EXISTS',
  InvalidCurrentPassword = 'INVALID_CURRENT_PASSWORD',
  InvalidCredentials = 'INVALID_CREDENTIALS',
  ForeignKeyConflict = 'FOREIGN_KEY_CONFLICT',
  VALID_NUMBER = 'VALID_NUMBER',
  ID_NOT_EMPTY = 'ID_NOT_EMPTY',
  ID_NOT_FOUND = 'ID_NOT_FOUND',
  // Photo
  IMAGE_NOT_FOUND = 'IMAGE_NOT_FOUND'
}
