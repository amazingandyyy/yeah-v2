import Task from './model';

export default {
    fetchAll : function (req, res, next) {
        Task
            .find({})
            .then(data => {
                res.send(data)
            })
            .catch(next)
    },
    fetchAllOfOne : function (req, res, next) {
        Task
            .find({
                client: req.user._id
            })
            .then(data => {
                res.send(data)
            })
            .catch(next)
    },
    fetchOne : function (req, res, next) {
        Task
            .findById(req.params.id)
            .then(data => {
                res.send(data)
            })
            .catch(next)
    },
    updateOne : function (req, res, next) {
        const updateData = req.body;
        Task
            .findByIdAndUpdate(req.params.id, updateData, {new: true})
            .then((data) => {
                res.send(data);
            })
            .catch(next);
    }
};
