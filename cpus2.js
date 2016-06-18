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
    console.log(`Master: ${process.pid}`);
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(process.pid + ': Hello World\n');
    }).listen(8000);
    console.log(`Worker: ${process.pid}`);
}