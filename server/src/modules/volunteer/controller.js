const bcrypt = require('bcrypt-nodejs')

const token = require('../services').token;
const Organization = require('./organization.model');
const Event = require('./event.model');

exports.org = {
    create: function (req, res) {
        const userId = req.user._id;
        const reqData = req.body;
        if(!reqData.orgName){
            return res.send('orgName required')
        }

        const org = {
            ownership: userId,
            orgName: reqData.orgName
        }

        const newOrg = new Organization(org);

        newOrg.save(function (err, saved) {
            if (err) {
                return res.status(500).send(err);
            }

            res.send(saved);
        })
    },

    checkAuth: function(req, res, next){
        const orgId = req.body.orgId;
        if(!orgId){
            return res.status(401).send('orgId required');
        }
        Organization.findById(orgId, function(err, data){
            if (err || !data){ return res.status(401).send(err || 'Data not found')}
            req.organization = data;
            if(data.ownership.indexOf(req.user._id) == -1){
                return res.send('NOT authorized!')
            }
            next()
        })
    },

    getOne: function(req, res) {
        const orgId = req.query.orgId;
        if(!orgId){
            return res.status(401).send('orgId required');
        }
        Organization.findById(orgId, function(err, data){
            if (err || !data){ return res.status(401).send(err || 'Data not found')}
            res.send(data);
        })
    },

    getAll: function(req, res) {
        Organization.find({}, function(err, data){
            if (err || !data){ return res.status(401).send(err || 'Data not found')}
            res.send(data);
        })
    },

    deleteOne: function(req, res){
        const orgId = req.query.orgId || req.body.orgId;
        if(!orgId){
            return res.status(401).send('orgId required');
        }
        Organization.remove({_id: orgId}, function(err, data){
            if (err){ return res.status(401).send(err)}
            res.send(data);
        })
    },

    deleteAll: function(req, res){
        Organization.remove({}, function(err, data){
            if (err){ return res.status(401).send(err)}
            res.send(data);
        })
    }
}

exports.event = {
    getOne: function(req, res) {
        const eventId = req.query.eventId || req.body.eventId;
        if(!eventId){
            return res.status(401).send('eventId required');
        }
        Event.findById(eventId, function(err, data){
            if (err || !data){ return res.status(401).send(err || 'Data not found')}
            res.send(data);
        })
    },

    getAll: function(req, res) {
        Event.find({}, function(err, data){
            if (err || !data){ return res.status(401).send(err || 'Data not found')}
            res.send(data);
        }).sort({ 'createAt': -1 }).limit(50)
    },

    getAllEventsOfOneOrg: function(req, res) {
        const orgId = req.query.orgId;
        if(!orgId){
            return res.status(401).send('orgId required');
        }
        Event.find({ownership: orgId}, function(err, data){
            if (err || !data){ return res.status(401).send(err || 'Data not found')}
            res.send(data);
        }).sort({ 'createAt': -1 })
    },


    create: function (req, res) {
        const orgId = req.organization._id;
        if(!orgId){
            return res.status(401).send('orgId required');
        }
        const reqData = req.body.eventData;
        if(!reqData){
            return res.status(401).send('eventData required');
        }
        if(!reqData.title){
            return res.send('title required')
        }

        const event = {
            ownership: orgId,
            title: reqData.title
        }

        const newEvent = new Event(event);

        newEvent.save(function (err, saved) {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(saved);
        })
    },
}