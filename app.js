const express = require('express');
const app = express();
const cors = require('cors');
const port = parseInt(process.env.PORT || 3000);
const csvToJson = require('convert-csv-to-json');
const data = csvToJson.fieldDelimiter(',').getJsonFromCsv('instructors.csv');

app.use(cors());

function findById(data, id){
    for (let i = 0; i < data.length; i++){
        let instructorString = data[i].id.toString();
        if (instructorString === id){
            return data[i];
        }
    }return null;
}

app.get('/', (request,response) => {
    response.json({data: data});
});

app.get('/:id', (request,response) => {
    var instructor = findById(data, request.params.id);
    if (!instructor){
        response.status(404).send({
            error: {
                message: "No record found!"
            }
        })
    }else {
        response.json({data: instructor});
    }
});

app.listen(port);