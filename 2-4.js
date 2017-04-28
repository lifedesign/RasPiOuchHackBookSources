// run the following command before using this program
// npm i i2c https


var i2c = require('i2c');
var wire = new i2c(0x40, {device: '/dev/i2c-1'});

function check(){
        wire.readBytes( 0x5e,2,(err,res)=>{
                var cm = ((res[0]*16+res[1])/64 ) ;

                if( cm < 50 ){
                        console.log(cm+'cm') ;
                        require('https').get(
                        	'https://maker.ifttt.com/trigger/KitchenComm/with/key/[secret key]') ;
                        setTimeout(check , 30*60*1000) ; // Don't check for 30 mins
                } else {
                        setTimeout(check , 1000) ; // Check after 1 sec
                }
        }) ;
}

check() ;
