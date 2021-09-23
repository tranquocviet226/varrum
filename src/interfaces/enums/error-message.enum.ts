export enum ErrorMessage {
  // Common
  INTERNAL_SERVER = 'Internal server error',
  REQUEST_TIMEOUT = 'Request timeout',
  NOT_FOUND = 'Not found!',
  // Auth
  UNAUTHORIZED = 'Unauthorized',
  INVALID_TOKEN = 'Invalid token',
  ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_EXPIRED',
  REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
  VERIFY_TOKEN_ERROR = 'Invalid token or expires!',
  ACTIVATED_EMAIL = 'Email has been activated',
  BLOCKED_EMAIL = 'Email has been blocked',
  // User
  USER_NOT_FOUND = 'User not found!',
  EMAIL_NOT_FOUND = 'Email not found!',
  EMAIL_NOT_EMPTY = 'Email should not be empty!',
  VERIFY_CODE_RESET_PASS_NOT_EMPTY = 'Code should not be empty!',
  CODE_EXPIRED = 'Verify code has expired',
  INVALID_CODE = 'Invalid verify code',
  VERIFY_CODE_RESET = 'Please verify code reset password',
  STATUS_REGEX = 'Status is invalid',
  PHONE_EXISTS = 'Phone already exists!',
  EMAIL_EXISTS = 'Email already exists!',
  AVATAR_ID_NOT_FOUND = 'avatar_id not found!',
  // Role
  ROLE_DOES_NOT_EXISTS = 'Role does not exists!',

  // Register
  FULL_NOT_EMPTY = 'Fullname should not be empty',
  FULLNAME_MAX_LENGTH = 'Fullname must be shorter than or equal to 100 characters',
  BIRTHDAY_NOT_EMPTY = 'Birthday should not be empty',
  BIRTHDAY_STRING = 'Birthday must be a valid ISO 8601 date string',
  PHONE_NOT_EMPTY = 'Phone should not be empty',
  PHONE_REGEX = 'Phone must match',
  EMAIL_VALID = 'Email must be an email',
  PASSWORD_REGEX = 'Password too weak',
  PASSWORD_NOT_EMPTY = 'Password should not be empty',
  PASSWORD_LENGTH = 'Password must be longer than or equal to 6 characters',
  EMAIL_PHONE_NOT_EMPTY = 'Email or phone should not be empty',
  // Role
  ROLE_EXISTS = 'Role already exists!',
  // Class
  VALID_NUMBER = 'Id must be a valid number',
  ID_NOT_EMPTY = 'Id should not be empty',
  ID_NOT_FOUND = 'Id not found!',

  CLASS_TYPE_NOT_EMPTY = 'Class type should not be empty',
  INVALID_CLASS_TYPE = `Class type must be 'basic' or 'advanced'`,
  // Photo
  IMAGE_NOT_FOUND = 'Image not found'
}
