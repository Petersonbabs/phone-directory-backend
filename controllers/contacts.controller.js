const contacts = require('../models/user.model');

const getContacts = async (req, res, next) => {
    try {
        const allContacts = await contacts.find()
        if (allContacts.length === 0) {
            res.status(403).json({
                status: 'failed',
                message: 'No contact found'
            })
            return
        }

        res.status(200).json({
            status: 'success',
            message: 'Contact fetched successfully!',
            allContacts
        })

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getSingleContact = async (req, res, next) => {
    const { id } = req.params

    try {
        const contact = await contacts.findById(id)
        if (!contact) {
            res.status(403).json({
                status: 'failed',
                message: 'Contact not found',
            })
            return
        }

        res.status(200).json({
            status: 'success',
            message: 'Contact fetched!',
            contact
        })
    } catch (error) {
        console.log(error)
    }
}

// Delete user
const deleteContact = async (req, res, next) => {
    const {id} = req.params

    try {
        await contacts.findByIdAndDelete(id)
        const user = await contacts.findById(id)
        if (user) {
            res.status(400).json({
                status: 'error',
                message: 'Oops! Your account was not deleted.'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Account was successfully deleted.'
        })

    } catch (error) {
        console.log('error occured at deleteUser controller: ' + error);
        next(error)
    }
}

// Update Profile
const editContact = async (req, res, next) => {

    try {
        const updatedContact = await contacts.findByIdAndUpdate(req.params.id, req.body)
        if (!updatedContact) {
            res.status(400).json({
                status: 'fail',
                message: 'Unable to update contact.'
            })
            return
        }

        res.status(200).json({
            status: 'success',
            message: 'Contact successfully update',
            contact: updatedContact
        })

    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = { getContacts, getSingleContact, deleteContact, editContact }