import Intership from './model';

export default {
    createOne: function(req, res, next) {
        const createBy = req.user._id;
        const title = req.body.title;
        const data = { createBy, ...req.body }
        Intership.create(data)
        .then(() => {
            res.send()
        })
        .catch(next)
    },
    fetchAll: function(req, res, next) {
        Intership.find({})
        .then(data => {
            res.send(data)
        })
        .catch(next)
    },
    fetchOne: function(req, res, next) {
        Intership.findById(req.params.id)
        .then(data => {
            res.send(data)
        })
        .catch(next)
    },
    deleteOne: function(req, res, next) {
        console.log('req.params.id: ', req.params.id);
        Intership.findByIdAndRemove(req.params.id)
        .then(() => {
            res.send()
        })
        .catch(next)
    }
};
