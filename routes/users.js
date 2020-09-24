const express = require("express");
const ExpressError = require("../expressError");

const User = require("../models/user")

const router = new express.Router()


/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/

router.get("/", async function(req, res, next) {
    try {
        const users = await User.all();
        return res.json({ users })
    } catch (e) {
        return next(e);
    }
})


/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

 router.get("/:username", async function(req, res, next) {
     try {
        const username = req.params.username;
        const user = await User.get(username);
        if (!user) throw new ExpressError("User does not exist", 404);
    
        return res.json({ user })

     } catch (e) {
         next(e);
     }
 })


/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/to", async function(req, res, next) {
    try {
        username = req.params.username
        const messages = await User.messagesTo(username);

        return res.json({ messages })


    } catch (e) {
        next(e)
    }
})


/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

 module.exports = router