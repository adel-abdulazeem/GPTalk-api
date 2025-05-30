// utils/hash.js
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

/**
 * Hashes a plain-text password.
 *
 * @param {string} plainTextPassword – The user's password in plain text.
 * @returns {Promise<string>} – The bcrypt hash of the password.
 */
export async function hashPassword(plainTextPassword) {
  return await bcrypt.hash(plainTextPassword, SALT_ROUNDS)
}

/**
 * Compares a plain-text password against a stored hash.
 *
 * @param {string} plainTextPassword – The password submitted by the user.
 * @param {string} hash – The bcrypt hash stored in your database.
 * @returns {Promise<boolean>} – True if the password matches, false otherwise.
 */
export async function verifyPassword(plainTextPassword, hash) {
  return await bcrypt.compare(plainTextPassword, hash)
}
