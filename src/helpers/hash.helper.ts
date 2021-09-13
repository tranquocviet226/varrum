import * as bcrypt from 'bcrypt'

export class HashHelper {
  private static salt = 10

  /**
   * Encrypts plain string
   * @param str {string}
   * @returns Promise<string> Returns encrypted
   */
  public static encrypt(str: string): Promise<string> {
    return bcrypt.hash(str, this.salt)
  }

  /**
   * Compares encrypted and provided string
   * @param plain {string}
   * @param encrypted {string}
   * @returns Promise<boolean> Returns Boolean if provided string and encrypted string are equal
   */
  public static compare(plain: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(plain, encrypted)
  }
}
