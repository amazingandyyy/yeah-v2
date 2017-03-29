import Spreadsheet from 'edit-google-spreadsheet';

import config from '../../config'
import axios from 'axios';
import Volunteer from './model';
let google_sheet_headers;

function fetchAllFromG(req, res, next){
    Spreadsheet.load({
        debug: true, 
        spreadsheetId: 'ff-aivLQCyOB_E7xHHxnshXsksbw4_LD0', 
        worksheetId: '423423423432',

        oauth2: {
            client_id: "119308312064-8554n6atpn81rcfh058jrpd082ubb76s.apps.googleusercontent.com",
            client_secret: config.g.google_sheet_client_secret,
            refresh_token: "1/G_Q-_0Pd3ZlqpoNxveq8GYDSqDmTsv7o5LsEKK5KLmbTOXBC0ii8YFtKs9l30ID9"
        }
    }, (err, sp) => {
        if(err || !sp) return next(err)
        google_sheet_headers = sp.authHeaders.Authorization;
        request(google_sheet_headers)
    });
    function request(header){
        axios.get("https://sheets.googleapis.com/v4/spreadsheets/11TIiGGDQLRW1-aivLQCyOB_E7xHHxnshXsksbw4_LD0/values/A2:X30?majorDimension=ROWS", {
                headers: {
                    "Authorization": header
                }
            }).then(response=>{
                let sheetData = response.data.values;
                // return res.send(cleanData(sheetData))
                saveToMongo(cleanData(sheetData));
        }).catch(next)
    }
}
function saveToMongo(data){
    console.log(data.length)
    Volunteer.create(data, (err, data)=>{
        if(err){ return console.log(err)
        }else{ console.log('add a row of new volunteer events from googlesheet') }
    })
}
function fetchOneFromG(req, res, next){
    const id = Number(req.params.id);
    console.log('backend id', id)
    Spreadsheet.load({
        debug: true, 
        spreadsheetId: 'ff-aivLQCyOB_E7xHHxnshXsksbw4_LD0', 
        worksheetId: '423423423432',

        oauth2: {
            client_id: "119308312064-8554n6atpn81rcfh058jrpd082ubb76s.apps.googleusercontent.com",
            client_secret: config.g.google_sheet_client_secret,
            refresh_token: "1/G_Q-_0Pd3ZlqpoNxveq8GYDSqDmTsv7o5LsEKK5KLmbTOXBC0ii8YFtKs9l30ID9"
        }
    }, (err, sp) => {
        if(err || !sp) return next(err)
        google_sheet_headers = sp.authHeaders.Authorization;
        request(google_sheet_headers)
    });
    function request(header){
        axios.get(`https://sheets.googleapis.com/v4/spreadsheets/11TIiGGDQLRW1-aivLQCyOB_E7xHHxnshXsksbw4_LD0/values/A${id+1}:X${id+1}?majorDimension=ROWS`, {
                headers: {
                    "Authorization": header
                }
            }).then(response=>{
                let sheetData = response.data.values;
                return res.send(cleanData(sheetData))
        }).catch(next)
    }
}

function cleanData(sheetData){
    return sheetData.map((event, index) => {
        return eventGenerater(event, index)
    })
    function eventGenerater(event, index){
        return {
            id: index,
            createAt: event[0],
            position: event[1],
            title: event[21],
            time: event[2],
            location: {
                address: event[3],
                coord: {
                    lng: event[23],
                    lat: event[22]
                }
            },
            organization: {
                name: event[4],
                url: event[5],
                introduction: event[6]
            },
            duties: event[7],
            takeaways: [
                event[8], event[9], event[10], event[11], event[12]||null
            ],
            prerequisite: event[14],
            applyMethod: event[15],
            majors: event[16].replace(/s+/g, '').split(/,?\s+/),
            interests: event[17].split(/,?\s+/),
            postedBy: {
                name: event[18],
                email: event[19]
            },
            resource: event[20]
        }
    }
}


export {
    fetchAllFromG,
    fetchOneFromG
};