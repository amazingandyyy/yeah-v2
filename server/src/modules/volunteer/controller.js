import Volunteer from './model';

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

        Volunteer.create(data)
        .then((d) => {
            res.send()
        })
        .catch(next)
    },
    fetchAll: function(req, res, next) {
        Volunteer.find({})
        .then(data => {
            res.send(data)
        })
        .catch(next)
    },
    fetchAllFromG: function(req, res, next) {
        const spreadsheetId = "11TIiGGDQLRW1-aivLQCyOB_E7xHHxnshXsksbw4_LD0";
        const sheetId = "909922863";
        
    },
    fetchOne: function(req, res, next) {
        Volunteer.findById(req.params.id)
        .then(data => {
            res.send(data)
        })
        .catch(next)
    },
    deleteOne: function(req, res, next) {
        console.log('req.params.id: ', req.params.id);
        Volunteer.findByIdAndRemove(req.params.id)
        .then(() => {
            res.send()
        })
        .catch(next)
    },
    deleteAll: () => {
        Volunteer.remove({})
        .then(() => {
            console.log('Volunteers are all gone.')
        })
        .catch()
    },
    updateOne: function(req, res, next){
        Volunteer.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.send();
        })
        .catch(next);
    }
};
