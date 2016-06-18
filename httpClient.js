var http = require('http');

function main(argv){
	if(argv[1] === "get" || argv[1] === undefined){
		http.get(argv[0], function(response){
			var body = [];
			console.log(response.statusCode);
			console.log(response.headers);
			response.on('data', function(chunk){
				body.push(chunk);
			});
			response.on('end', function(){
				body = Buffer.concat(body);
				console.log(body.toString());
			});
		});
	}else if(argv[1] === "post"){
		var arr = argv[0].split(':');
		var options = {
			hostname:arr[0],
			port:arr[1],
			path:'/',
			method:'POST',
			headers:{
				'Content-Type':'application/x-www-form-urlencoded'
			}
		};
		var request = http.request(options, function(response){
			var body = [];
			console.log(response.statusCode);
			console.log(response.headers);
			response.on('data', function(chunk){
				body.push(chunk);
			});
			response.on('end', function(){
				body = Buffer.concat(body);
				console.log(body.toString());
			});
		});
		request.end();
	}
}

main(process.argv.slice(2));