export default {
    createOne: function(req, res, next) {
        const createBy = req.user._id;
        const title = req.body.title;
        const data = { createBy, ...req.body }
        Internship.create(data)
        .then(() => {
            res.send()
        })
        .catch(next)
    }
};
