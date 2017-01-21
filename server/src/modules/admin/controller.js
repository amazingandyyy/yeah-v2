import Admin from './model';
import User from '../user/model';

export default {
    addAdminByEmail : (email) => {
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
                if(admin){
                    throw new Error(`${email} is already an admin`);
                }
                return Admin.create({user: userId})
            })
            .then((user) => console.log(`${email} is an new admin now`))
            .catch((err) => console.log(err.message))
    },
    checkAdminById : (id) => {
        return Admin.findOne({user: id})
    },
    removeAdminByEmail : (email) => {
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
            .catch((err) => console.log(err.message))
    }
}