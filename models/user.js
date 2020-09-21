/** User class for message.ly */

const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError")
const db = require("../db")
const bcypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config")


/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) {
    const hashedPassword = await bcypt.hash(password, BCRYPT_WORK_FACTOR)
    const result = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, phone)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING username, first_name, last_name, phone`,
      [username, hashedPassword, first_name, last_name, phone]
      );
      return result.rows[0]
    }
    
    /** Authenticate: is this username/password valid? Returns boolean. */
    
    static async authenticate(username, password) { 
      const result = await db.query(
        `SELECT password
        FROM users
        WHERE username = $1`,
        [username]
      );
      const user = result.rows[0]

      if (user) {
        if (await bcrypt.compare(password, user.password) === true) {
          return true;
        }
      }
      return false
    }
    
    /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    const timeStamp = new Date(Date.now()).toISOString();
    const result = await db.query(
      `UPDATE users 
      SET last_login_at=$1 
      WHERE username=$2 
      RETURNING username, last_login_at`, [timeStamp, username]
    )
    return result.rows[0];

   }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    const results = await db.query(
      `SELECT username, first_name, last_name, phone
      FROM users`
    )
    return results.rows
   }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const result = await db.query(
      `SELECT username, first_name, last_name, join_at, last_login_at
      FROM users
      WHERE username=$1`,
      [username]
    );
    return result.rows[0]
   }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */
    



  static async messagesFrom(username) {

    const results = await db.query(
      `SELECT id, body, sent_at, read_at
      FROM messages
      WHERE from_username=$1`,
      [username]
    );
    const user = await db.query(
      `SELECT username, first_name, last_name, phone
      FROM users
      WHERE username=$1`,
      [username]
    )
    results.rows.map(r => r.from_user = user)

    return results.rows

   }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {id, first_name, last_name, phone}
   */

  static async messagesTo(username) { }
}


module.exports = User;