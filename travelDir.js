var fs = require('fs');
var path = require('path');

/*
	遍历目录文件算法：深度优先+先序遍历
*/
function syncTravel(dir, callback){
	try{
		if(fs.statSync(dir).isDirectory()){
			var me = arguments.callee;
			fs.readdirSync(dir).forEach(function(file){
				var pathname = path.join(dir, file);
				if(fs.statSync(pathname).isDirectory()){
					//arguments.callee(pathname, callback);
					//注意到此时在哪个函数域内					
					me(pathname, callback);
				}else{
					callback(pathname);
				}
			});
		}else{
			callback(dir);
		}
	}catch(e){
		console.log(e);
	}
}

//为了简便，忽略err
function asyncTravel(dir, callback, finish){
	var me = arguments.callee;
	fs.stat(dir, function(err, status){
		if(status.isDirectory()){			
			fs.readdir(dir, function(err, files){
				(function next(i){
					if(i < files.length){
						var pathname = path.join(dir, files[i]);						
						fs.stat(pathname, function(err, stats){
                   			if (stats.isDirectory()) {
                        		me(pathname, callback, function () {
                            		next(i + 1);
                        		});
                   			}else{
                       			callback(pathname, function(){
                            		next(i + 1);
                        		});
                   			 }
                		});
					}else{
						finish && finish();
					}
				}(0));
			});
		}else{
			callback(dir);
		}
	});
}

function main(argv){
	if(argv[1] === "sync"){
		console.log(argv[1] + "-->" + "同步搜索");
		syncTravel(argv[0], function(file){
			console.log(file);
		});
	}else if(argv[1] === "async" || argv[1] === undefined){//无参数时默认为异步搜索
		console.log(argv[1] + "-->" + "异步搜索");
		asyncTravel(argv[0], function(file, callback){
			console.log(file);
			callback && callback();
		});
	}else{
		console.log("invalid arguments");
		console.log("sync or async");
	}
}

main(process.argv.slice(2));