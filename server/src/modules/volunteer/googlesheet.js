import Spreadsheet from 'edit-google-spreadsheet';

import config from '../../config'
import axios from 'axios';

let google_sheet_headers;

function getData(req, res, next){

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
        axios.get("https://sheets.googleapis.com/v4/spreadsheets/11TIiGGDQLRW1-aivLQCyOB_E7xHHxnshXsksbw4_LD0/values/A1:W26?majorDimension=ROWS", {
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
    return sheetData.map(event => {
        return eventGenerater(event)
    })
    function eventGenerater(event){
        return {
            createAt: event[0],
            title: event[1],
            time: event[2],
            location: event[3],
            orgnization: {
                name: event[4],
                url: event[5],
                introduction: event[6]
            },
            duties: event[7],
            takeaways: [
                event[8], event[9], event[10], event[11], event[12]||null
            ],
            prerequisites: event[14],
            applyMethod: event[15],
            majors: event[16].split(','),
            interests: event[17].split(','),
            postedBy: {
                name: event[18],
                email: event[19]
            },
            resource: event[20]
        }
    }
}


export default getData;