const moment = require('moment');
const fs = require('fs');
var endOfLine = require('os').EOL;
const { Writable, Readable, Transform} = require('stream');
moment.suppressDeprecationWarnings = true;

/*const w =fs.createWriteStream('./dates.txt');
setInterval(()=>{
    w.write(moment().toString().concat(endOfLine), (err, b)=>{
        if(err)
            throw err;
        console.log("success");
    });
}, 1000);*/




class MyReadable extends Readable {
    constructor(){
        super();
    }
    _read(size){  
      setTimeout(()=>{
          this.push((new Date()).toString());
        }, 1000);
    }
}


class MyWritable extends Writable {
    constructor(filepath) {
      super();
      this.fd = fs.openSync(filepath, 'w+');
    }
    _write(chunk, encoding, callback) {
        fs.write(this.fd, chunk,  (err)=>{
          if(err) 
            throw err;
          console.log('success')});
        callback();
    }
  }



  class MyTransform extends Transform {
    constructor() {
      super();
    }
    _transform(chunk, encoding, callback) {
        this.push(moment(chunk.toString()).toString().concat(endOfLine));
      callback();
    }
  }

  const myRStream = new MyReadable();
  const myWStream = new MyWritable('./dates.txt');
  const myTStream = new MyTransform();

  myRStream.pipe(myTStream).pipe(myWStream);