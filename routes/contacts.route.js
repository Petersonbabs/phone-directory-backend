const router = require("express").Router();
const {getContacts, getSingleContact, deleteContact, editContact} = require("../controllers/contacts.controller");


router.route('/').get(getContacts)
router.route('/:id').get(getSingleContact)
router.route('/:id').delete(deleteContact)
router.route('/:id').patch(editContact)
module.exports = router 