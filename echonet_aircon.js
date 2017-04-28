// run the following command before using this library
// $ npm i node-echonet-lite

// Load the node-echonet-lite module
var EchonetLite = require('node-echonet-lite');
 
// Create an EchonetLite object
//   The type of network layer must be passed.
var el = new EchonetLite({'type': 'lan'});
 
// Initialize the EchonetLite object
el.init((err) => {
  if(err) { // An error was occurred
    showErrorExit(err);
  } else { // Start to discover devices
    discoverDevices();
  }
});
 
// Start to discover devices
function discoverDevices(){
  // Start to discover Echonet Lite devices
  el.startDiscovery((err, res) => {
    if(err) { // Error handling
      showErrorExit(err);
    }
    // Determine the type of the found device
    var device = res['device'];
    var address = device['address'];

    for( var di=0 ; di<device['eoj'].length ; ++di ){
      var eoj = device['eoj'][di];
      var group_code = eoj[0]; // Class group code
      var class_code = eoj[1]; // Class code
      if(group_code === 0x01 && class_code === 0x30) {
        // This means that the found device belongs to the home air conditioner class
    exports.setTemp = function(temp){
            el.setPropertyValue(address, eoj, 0xb3,(new Buffer([temp])), (err, res) => {
        console.log('ECHONET Lite Air-Conditioner new temp: ' + temp + '.');
            });
        } ;
      el.stopDiscovery();
        return ;
      }
    }
  });
}

exports.setTemp = function(){ console.log('Air-conditioner not found.'); } ;
 
 
// Get the operation status
function getOperationStatus(address, eoj) {
  var epc = 0x80; // An property code which means operation status
  el.getPropertyValue(address, eoj, 0x80, (err, res) => {
    // this value is true if the air conditione is on
    var status = res['message']['data']['status'];
    var desc = (status ? 'on' : 'off');
    console.log('The air conditioner is ' + desc + '.');
    // Toggle the status of the operation status
    changePowerStatus(address, eoj, epc, !status);
  });
}
 
// Change the status of the operation status
function changePowerStatus(address, eoj, epc, status) {
  var edt = { 'status': status };
  el.setPropertyValue(address, eoj, epc, edt, (err, res) => {
    var desc = (status ? 'on' : 'off');
    console.log('The air conditioner was turned ' + desc + '.');
    el.close(() => {
      console.log('Closed.');
            // This script terminates here.
    });
  });
}
 
// Print an error then terminate the process of this script
function showErrorExit(err) {
  console.log('[ERROR] '+ err.toString());
  process.exit();
}