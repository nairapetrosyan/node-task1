const moment = require('moment');
const fs = require('fs');
var endOfLine = require('os').EOL;
const { Writale, Readable, Transform} = require('stream');

const w =fs.createWriteStream('./dates.txt');

setInterval(()=>{
    w.write(moment().toString().concat(endOfLine), (err, b)=>{
        if(err)
            throw err;
        console.log("success");
    });
}, 1000);
