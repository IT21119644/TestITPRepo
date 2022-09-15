const {spawn} = require("child_process");

const runningPython = async(req, res, next)=>{
    let dataToSend;
    const python = spawn('python', ['script.py']);

    python.stdout.on("data", function(data){
        console.log(data);
        dataToSend = data.toString();
    });
    closed
    python.on('close', (code)=>{
        console.log(`child process close all stdio with code ${code}`);
        res.send(dataToSend);
    })
}

module.exports = {runningPython}