import Volunteer from './model';
import { fetchAllFromG } from './googlesheet';

export default {
    fetchAll : function (req, res, next) {
        Volunteer
            .find({})
            .then(data => {
                res.send(data)
            })
            .catch(next)
    },
    fetchOne : function (req, res, next) {
        Volunteer
            .findById(req.params.id)
            .then(data => {
                res.send(data)
            })
            .catch(next)
    },
    deleteOne : function (req, res, next) {
        console.log('req.params.id: ', req.params.id);
        Volunteer
            .findByIdAndRemove(req.params.id)
            .then(() => {
                res.send()
            })
            .catch(next)
    },
    deleteAll : () => {
        Volunteer
            .remove({})
            .then(() => {
                console.log('Volunteers are all gone.')
            })
            .catch()
    },
    updateOne : function (req, res, next) {
        Volunteer
            .findByIdAndUpdate(req.params.id, req.body)
            .then(() => {
                res.send();
            })
            .catch(next);
    },
    fetchAllFromG: fetchAllFromG
};
