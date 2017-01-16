import Volunteer from './model';

export default {
    createResource: function(req, res, next) {
        const createBy = req.user._id;
        const title = req.body.title;
        const resource = { createBy, title }
        console.log('resource: ', resource)
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
    }
};
