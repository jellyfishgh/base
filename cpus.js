var cluster = require('cluster');
var http = require('http');
var numCpus = require('os').cpus().length;

var rssWarn = (50 * 1024 * 1024),
    heapWarn = (50 * 1024 * 1024);

var workers = {};

if (cluster.isMaster) {
    console.log(`Master: ${process.pid}`);
    for (var i = 0; i < numCpus; i++) {
        createWorker();
    }
    setInterval(function() {
        var time = new Date().getTime();
        for (var pid in workers) {
            if (workers.hasOwnProperty(pid) && workers[pid].lastCb + 5000 < time) {
                console.log('Long running worker ' + pid + ' killed');
                workers[pid].worker.kill();
                delete workers[pid];
                createWorker();
            }
        }
    }, 1000);
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    http.createServer(function(req, res) {
        // 1/4 的概率超时
        if (Math.floor(Math.random() * 4) === 1) {
            console.log('Stopped ' + process.pid + ' from ever finishing');
            while (true) {}
        }
        res.writeHead(200);
        res.end('hello world from ' + process.pid + '\n');
    }).listen(8000);
    setInterval(function(){
        process.send({
            cmd: 'reportMem',
            memory: process.memoryUsage(),
            process: process.pid
        });
    }, 1000);
}

function createWorker() {
    var worker = cluster.fork();
    console.log("Worker is created: " + worker.process.pid);
    workers[worker.process.pid] = {
        worker: worker,
        lastCb: new Date().getTime() - 1000
    };
    worker.on('message', function(msg) {
        console.log(`${msg.process} -> ${msg.memory.rss}`);
        if (msg.cmd === 'reportMem') {
            workers[msg.process].lastCb = new Date().getTime();
            if (msg.memory.rss > rssWarn) {
                console.log('Worker ' + msg.process + 'using too much memory.');
            }
        }
    });
}
