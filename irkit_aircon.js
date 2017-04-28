// run the following command before using this library
// $ npm i request

var IRKIT_CLIENT_KEY = [CLIENTKEYSTRING] ;	// 自分の値に変更
var IRKIT_DEVICE_ID  = [DEVICEIDSTRING] ;	// 自分の値に変更

// 自分のリモコン信号をIRKitに入力して、温度と信号との対応を調べて以下に記述しておく。
// 気温は26,28,30に限らず、細かいほどよい。
var signal_map = [
	{temp:26 , message:'{"format":"raw","freq":38,"data":[ ... ]}'}
	,{temp:28 , message:'{"format":"raw","freq":38,"data":[ ... ]}'}
	,{temp:30 , message:'{"format":"raw","freq":38,"data":[ ... ]}'}
   				:
] ;

var request = require('request');

exports.setTemp = function(temp){
	var best_setting, temp_dist = 9999 ;
	for( var setting in signal_map ){
    	if( Math.abs(setting.temp - temp) < temp_dist ){
        	best_setting = setting ;
            temp_dist = Math.abs(setting.temp - temp) ;
		}
    }
	request.post(
        'https://api.getirkit.com/1/messages'
        ,{
                form: {
                        clientkey : IRKIT_CLIENT_KEY,
                        deviceid  : IRKIT_DEVICE_ID,
                        message   : best_setting.message
                }
        }
        ,function () {
                console.log(JSON.stringify(arguments)) ;
        }
	);
} ;
