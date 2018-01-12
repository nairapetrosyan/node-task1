const moment = require('moment');
const fs = require('fs');
var endOfLine = require('os').EOL;
const { Writable, Readable, Transform} = require('stream');

const w =fs.createWriteStream('./dates.txt');

// setInterval(()=>{
//     w.write(moment().toString().concat(endOfLine), (err, b)=>{
//         if(err)
//             throw err;
//         console.log("success");
//     });
// }, 1000);

console.log(moment.duration(1000));

// moment.duration(1000).(function() {
//     w.write(moment().toString().concat(endOfLine), (err, b)=>{
//         if(err)
//             throw err;
//         console.log("success");
//         });
//   });


class MyReadable extends Readable {
    constructor(){
        super();


    }
    _read(size){
        
        this.push((new Date()).toString());

    }
}


class MyWritable extends Writable {
    constructor(filepath) {
      super();
      this.fd = fs.openSync(filepath, 'w+');
      console.log(this.fd, 'aaaaaaaaaaaaaaaaaa');
    }
    _write(chunk, encoding, callback) {
        //console.log(this.fd);
        fs.write(this.fd, chunk, (err, fd)=>{if(err) throw err; console.log('success')});
        callback();
    }
  }

  class MyTransform extends Transform {
    constructor() {
      super();
    }
    _transform(chunk, encoding, callback) {
    }
  }

  const myRStream = new MyReadable();
  const myWStream = new MyWritable('./dates.txt');

  myRStream.pipe(myWStream);

