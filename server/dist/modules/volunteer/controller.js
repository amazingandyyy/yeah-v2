'use strict';

var bcrypt = require('bcrypt-nodejs');

var token = require('../services').token;
var Organization = require('./organization.model');
var Event = require('./event.model');

exports.org = {
    create: function create(req, res) {
        var userId = req.user._id;
        var reqData = req.body;
        if (!reqData.orgName) {
            return res.send('orgName required');
        }

        var org = {
            ownership: userId,
            orgName: reqData.orgName
        };

        var newOrg = new Organization(org);

        newOrg.save(function (err, saved) {
            if (err) {
                return res.status(500).send(err);
            }

            res.send(saved);
        });
    },

    checkAuth: function checkAuth(req, res, next) {
        var orgId = req.body.orgId;
        if (!orgId) {
            return res.status(401).send('orgId required');
        }
        Organization.findById(orgId, function (err, data) {
            if (err || !data) {
                return res.status(401).send(err || 'Data not found');
            }
            req.organization = data;
            if (data.ownership.indexOf(req.user._id) == -1) {
                return res.send('NOT authorized!');
            }
            next();
        });
    },

    getOne: function getOne(req, res) {
        var orgId = req.query.orgId;
        if (!orgId) {
            return res.status(401).send('orgId required');
        }
        Organization.findById(orgId, function (err, data) {
            if (err || !data) {
                return res.status(401).send(err || 'Data not found');
            }
            res.send(data);
        });
    },

    getAll: function getAll(req, res) {
        Organization.find({}, function (err, data) {
            if (err || !data) {
                return res.status(401).send(err || 'Data not found');
            }
            res.send(data);
        });
    },

    deleteOne: function deleteOne(req, res) {
        var orgId = req.query.orgId || req.body.orgId;
        if (!orgId) {
            return res.status(401).send('orgId required');
        }
        Organization.remove({ _id: orgId }, function (err, data) {
            if (err) {
                return res.status(401).send(err);
            }
            res.send(data);
        });
    },

    deleteAll: function deleteAll(req, res) {
        Organization.remove({}, function (err, data) {
            if (err) {
                return res.status(401).send(err);
            }
            res.send(data);
        });
    }
};

exports.event = {
    getOne: function getOne(req, res) {
        var eventId = req.query.eventId || req.body.eventId;
        if (!eventId) {
            return res.status(401).send('eventId required');
        }
        Event.findById(eventId, function (err, data) {
            if (err || !data) {
                return res.status(401).send(err || 'Data not found');
            }
            res.send(data);
        });
    },

    getAll: function getAll(req, res) {
        Event.find({}, function (err, data) {
            if (err || !data) {
                return res.status(401).send(err || 'Data not found');
            }
            res.send(data);
        }).sort({ 'createAt': -1 }).limit(50);
    },

    getAllEventsOfOneOrg: function getAllEventsOfOneOrg(req, res) {
        var orgId = req.query.orgId;
        if (!orgId) {
            return res.status(401).send('orgId required');
        }
        Event.find({ ownership: orgId }, function (err, data) {
            if (err || !data) {
                return res.status(401).send(err || 'Data not found');
            }
            res.send(data);
        }).sort({ 'createAt': -1 });
    },

    create: function create(req, res) {
        var orgId = req.organization._id;
        if (!orgId) {
            return res.status(401).send('orgId required');
        }
        var reqData = req.body.eventData;
        if (!reqData) {
            return res.status(401).send('eventData required');
        }
        if (!reqData.title) {
            return res.send('title required');
        }

        var event = {
            ownership: orgId,
            title: reqData.title
        };

        var newEvent = new Event(event);

        newEvent.save(function (err, saved) {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(saved);
        });
    }
};