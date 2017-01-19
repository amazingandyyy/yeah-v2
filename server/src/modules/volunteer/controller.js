import Volunteer from './model';

export default {
    createResource: function(req, res, next) {
        const createBy = req.user._id;
        const title = req.body.title;
        const resource = { createBy, ...req.body }
        Volunteer.create(resource)
        .then(data => {
            res.send()
        })
        .catch(next)
    },
    fetchAll: function(req, res, next) {
        Volunteer.find({})
        .then(data => {
            res.json(data)
        })
        .catch(next)
    },
    fetchOne: function(req, res, next) {
        Volunteer.findById(req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(next)
    }
};
