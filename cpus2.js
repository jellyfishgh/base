var cluster = require('cluster');
var http = require('http');
var numCpus = require('os').cpus().length;

if (cluster.isMaster) {
    for (var i = 0; i < numCpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Hello World\n');
    }).listen(8000);
}