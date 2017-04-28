// run the following command before using this program
// $ npm i node-bme280

var TARGET_DISCONFORT = 67.5 ;

var Aircon = require('./irkit_aircon.js') ;       // IRKitを用いるとき
//var Aircon = require('./echonet_aircon.js') ;   // ECHONET Liteを用いるとき

var BME280 = require('node-bme280');

var barometer = new BME280({address: 0x76});

var curTemp = -1 ;

barometer.begin(function(err) {
        if (err) {
                console.info('error initializing barometer', err);
                return;
        }

        setInterval(function() {
                barometer.readPressureAndTemparature(function(err, pressure, temperature, humidity) {
                        var nextTemp = Math.round(
                                (TARGET_DISCONFORT - 46.3 + 0.143*humidity) / (0.81+0.0099*humidity) );
                        if( curTemp != nextTemp ){
                                Aircon.setTemp(nextTemp) ;
                                curTemp = nextTemp ;
                        }
                }) ;
        }, 5*60*1000);  // 5分間隔
});