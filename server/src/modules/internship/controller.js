import Internship from './model';

export default {
    createOne: function(req, res, next) {
        const createBy = req.user._id;
        const title = req.body.title;
        let data;
        if(req.body.location){
            const coordinates = [
                req.body.location.location.lng,
                req.body.location.location.lat    
            ]
            data = { 
                createBy, 
                ...req.body,
                geometry: {
                    coordinates
                }
            }
        }else{
            data = { 
                createBy, 
                ...req.body
            }
        }
        Internship.create(data)
        .then(() => {
            res.send()
        })
        .catch(next)
    },
    fetchAll: function(req, res, next) {
        Internship.find({})
        .then(data => {
            res.send(data)
        })
        .catch(next)
    },
    fetchOne: function(req, res, next) {
        Internship.findById(req.params.id)
        .then(data => {
            res.send(data)
        })
        .catch(next)
    },
    deleteOne: function(req, res, next) {
        console.log('req.params.id: ', req.params.id);
        Internship.findByIdAndRemove(req.params.id)
        .then(() => {
            res.send()
        })
        .catch(next)
    }
};
