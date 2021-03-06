import Course from './model';

export default {
    createOne: function(req, res, next) {
        const createBy = req.user._id;
        let coordinates = null;
        let data = {
            ...req.body,
            createBy
        };
        Course.create(data)
        .then((savedData) => {
            console.log('savedData: ', savedData);
            res.send({success: true})  
        })
        .catch(next)
    },
    fetchAll: function(req, res, next) {
        Course.find({})
        .then(data => {
            res.send(data)
        })
        .catch(next)
    },
    fetchOne: function(req, res, next) {
        Course.findById(req.params.id)
        .then(data => {
            console.log(data)
            res.send(data)
        })
        .catch(next)
    },
    deleteOne: function(req, res, next) {
        console.log('req.params.id: ', req.params.id);
        Course.findByIdAndRemove(req.params.id)
        .then(() => {
            res.send();
        })
        .catch(next)
    },
    updateOne: function(req, res, next){
        Course.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.send();
        })
        .catch(next);
    },
    signupOneForOneCourse: function(req, res, next){
        Course.findById(req.params.id, req.body)
        .then((course) => {
            const userId = req.params.userId;
            course.participants.push({userId})
            return course.save()
        })
        .then(() => {
            res.send();
        })
        .catch(next);
    },
    checkinOneforOneCourse: function(req, res, next){
        Course.findOneAndUpdate(req.params.id, req.body)
        .then((course) => {
            // const userId = req.params.userId;
            // course.participants.push(userId);
            // return course.save();
        })
        .then(() => {
            res.send();
        })
        .catch(next);
    }
};
