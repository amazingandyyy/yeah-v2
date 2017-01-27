import Admin from './model';
import User from '../user/model';

const addAdminByEmail = (email) => {
    let userId;
    User
        .findOne({
        'email.data': {
            '$in': email
        }
    })
        .then((user) => {
            userId = user._id;
            return Admin.findOne({user: userId});
        })
        .then((admin) => {
            if (admin) {
                throw new Error(`${email} is already an admin`);
            }
            return Admin.create({user: userId})
        })
        .then((user) => console.log(`${email} is an new admin now`))
        .catch((err) => console.log(`${err.message} when addAdminByEmail`))
};
const checkAdminById = (id) => {
    return Admin.findOne({user: id})
}
const removeAdminByEmail = (email) => {
    let userId;
    User
        .findOne({
        'email.data': {
            '$in': email
        }
    })
        .then((user) => {
            userId = user._id;
            return Admin.findOneAndRemove({user: userId});
        })
        .then(() => console.log(`${email} has been remove from admin list`))
        .catch((err) => console.log(`${err.message} when removeAdminByEmail`))
};

const removeAdmin = () => {
    Admin
        .remove({})
        .then(() => console.log('Removed all admins data'))
        .then((err) => console.log(`${err.message} when remove all admin`))
}

const controller = {
    addAdminByEmail,
    checkAdminById,
    removeAdminByEmail,
    removeAdmin
}

export default controller;