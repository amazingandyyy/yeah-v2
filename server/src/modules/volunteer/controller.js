import Volunteer from './model';

import config from '../../config'
import Spreadsheet from 'edit-google-spreadsheet';

export default {
    createOne : function (req, res, next) {
        const createBy = req.user._id;
        const title = req.body.title;
        let data;
        if (req.body.location) {
            const coordinates = [req.body.location.location.lng, req.body.location.location.lat]
            data = {
                createBy,
                ...req.body,
                geometry: {
                    coordinates
                }
            }
        } else {
            data = {
                createBy,
                ...req.body
            }
        }

        Volunteer
            .create(data)
            .then((d) => {
                res.send()
            })
            .catch(next)
    },
    fetchAll : function (req, res, next) {
        Volunteer
            .find({})
            .then(data => {
                res.send(data)
            })
            .catch(next)
    },
    fetchAllFromG : function (req, res, next) {
        Spreadsheet.load({
            debug: true, 
            spreadsheetId: '11TIiGGDQLRW1-aivLQCyOB_E7xHHxnshXsksbw4_LD0', 
            worksheetId: '909922863',

            oauth2: {
                client_id: "119308312064-8554n6atpn81rcfh058jrpd082ubb76s.apps.googleusercontent.com",
                client_secret: config.g.google_sheet_client_secret,
                refresh_token: "1/3ycgTRDmaP91i_Ae7HM_m__zck3yw5b77_FhcVAGIV8"
            }
        }, (err, spreadsheet) => {
            //use speadsheet!
            console.log(err, spreadsheet)
            if(err || !spreadsheet) return next(err)
            return res.send(spreadsheet)
        });

    },
    fetchOne : function (req, res, next) {
        Volunteer
            .findById(req.params.id)
            .then(data => {
                res.send(data)
            })
            .catch(next)
    },
    deleteOne : function (req, res, next) {
        console.log('req.params.id: ', req.params.id);
        Volunteer
            .findByIdAndRemove(req.params.id)
            .then(() => {
                res.send()
            })
            .catch(next)
    },
    deleteAll : () => {
        Volunteer
            .remove({})
            .then(() => {
                console.log('Volunteers are all gone.')
            })
            .catch()
    },
    updateOne : function (req, res, next) {
        Volunteer
            .findByIdAndUpdate(req.params.id, req.body)
            .then(() => {
                res.send();
            })
            .catch(next);
    }
};
