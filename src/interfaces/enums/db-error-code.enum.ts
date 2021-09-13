export enum DBErrorCode {
  PgNotNullConstraintViolation = '23502',
  PgForeignKeyConstraintViolation = '23503',
  PgUniqueConstraintViolation = '23505',
  ER_DUP_ENTRY = 'ER_DUP_ENTRY',
  ER_NO_DEFAULT_FOR_FIELD = 'ER_NO_DEFAULT_FOR_FIELD'
}
