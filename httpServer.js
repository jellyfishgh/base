var http = require('http');

function main(argv){
	http.createServer(function(request, response){
		var body = [];
		console.log(request.method);
		console.log(request.headers);
		request.on('data', function(chunk){
			body.push(chunk);
		});
		request.on('end', function(){
			body = Buffer.concat(body);
			console.log(body.toString());		
		});
		response.end("hello world");
	}).listen(argv[0]);
	console.log("http server is listening at " + argv[0]);
}

main(process.argv.slice(2));