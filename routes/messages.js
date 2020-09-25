const express = require("express");
const ExpressError = require("../expressError");

const Message = require("../models/message")

const router = new express.Router()


/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

 router.get("/:id", async function(req, res, next) {
     try {
        const messId = req.params.id;
        const message = await Message.get(messId)
        return res.json({ message })

     } catch (e) {
         next(e);
     }
 })


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

 router.post("/" async function(req, res, next) {
     try {
         
     } catch (e) {
         nexy(e)
     }
 })


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

module.exports = router