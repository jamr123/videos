var serialport = require("serialport"); 
var SerialPort = serialport.SerialPort; 

var serialPort = new SerialPort("/dev/ttyUSB0", {
  baudrate: 9600,
});



var Gpio = require('onoff').Gpio; 
var LED1 = new Gpio(23, 'out'); 
var LED2 = new Gpio(24, 'out'); 
var LED3 = new Gpio(25, 'out'); 

var stepPin = new Gpio(17, 'out'); 
var dirPin = new Gpio(27, 'out'); 
var EnPin= new Gpio(22, 'out'); 


var Arriba = new Gpio(5, 'in', 'both');
var Abajo = new Gpio(6, 'in', 'both');
var FC0 = new Gpio(12, 'in', 'both');
var FC1 = new Gpio(26, 'in', 'both');
var FC2 = new Gpio(19, 'in', 'both');
var FC3 = new Gpio(13, 'in', 'both');

var IO;

var ivArriba = setInterval(_ => stepPin.writeSync(stepPin.readSync() ^ 1), 1);
var ivAbajo = setInterval(_ => stepPin.writeSync(stepPin.readSync() ^ 1), 1);
var flagivArriba=false;
var flagivAbajo=false;

function socketSend(io){

    IO=io;
    EnPin.writeSync(0);
    

     
}

function initAbajo (){
  
    flagivAbajo==true;
    dirPin.writeSync(0);
    serialPort.write("2\n", function(err, results) {
      console.log("err: " + err);
      console.log("results: " + results);
    }); 
    console.error('buscando Abajo'); 
    IO.emit("messages","buscando Abajo");

}


Arriba.watch(function (err, value) { 
    if (err) {
      console.error('There was an error', err); 
    return;
    }

    if(value==0 && flagivArriba==false){
     
        flagivArriba==true;
        serialPort.write("2\n", function(err, results) {
          console.log("err: " + err);
          console.log("results: " + results);
        });
        console.log('buscando Arriba'); 
        IO.emit("messages","buscando Arriba");
    }



  });


  Abajo.watch(function (err, value) { 
    if (err) {
      console.error('There was an error', err); 
    return;
    }
    if(value==0 && flagivAbajo==false){
     
        flagivAbajo==true;
        serialPort.write("1\n", function(err, results) {
          console.log("err: " + err);
          console.log("results: " + results);
        });
        console.log('buscando Abajo'); 
        IO.emit("messages","buscando Abajo");
         
   
       }
  });


  FC0.watch(function (err, value) { 
    if (err) {
      console.error('There was an error', err); 
    return;
    }
    if(value==0){

      console.log('FC0'); 
    IO.emit("messages","nivel0");

    serialPort.write("3\n", function(err, results) {
      console.log("err: " + err);
      console.log("results: " + results);
    });

    LED1.writeSync(0);
    LED2.writeSync(0);
    LED3.writeSync(0);

    flagivArriba=false;
    flagivAbajo=false;
    }
  });

  FC1.watch(function (err, value) { 
    if (err) {
      console.error('There was an error', err); 
    return;
    }
    if(value==0){
    console.log('FC1'); 
    IO.emit("messages","nivel1");
    serialPort.write("3\n", function(err, results) {
      console.log("err: " + err);
      console.log("results: " + results);
    });
    LED1.writeSync(1);
    LED2.writeSync(0);
    LED3.writeSync(0);
    flagivArriba=false;
    flagivAbajo=false;

    }
  });

  FC2.watch(function (err, value) { 
    if (err) {
      console.error('There was an error', err); 
    return;
    }
    if(value==0){
    console.log('FC2'); 
    IO.emit("messages","nivel2");
    serialPort.write("3\n", function(err, results) {
      console.log("err: " + err);
      console.log("results: " + results);
    });
    LED1.writeSync(0);
    LED2.writeSync(1);
    LED3.writeSync(0);
    flagivArriba=false;
    flagivAbajo=false;

    }
  });

  FC3.watch(function (err, value) { 
    if (err) {
      console.error('There was an error', err); 
    return;
    }
    if(value==0){
    console.log('FC2'); 
    IO.emit("messages","nivel3");
    serialPort.write("3\n", function(err, results) {
      console.log("err: " + err);
      console.log("results: " + results);
    });
    LED1.writeSync(0);
    LED2.writeSync(0);
    LED3.writeSync(1);
    flagivArriba=false;
    flagivAbajo=false;
    }
  });





  process.on('SIGINT', _ => {
    LED1.unexport();
    LED2.unexport();
    LED3.unexport();
    stepPin.unexport();
    EnPin.unexport();
    dirPin.unexport();
    FC0.unexport();
    FC1.unexport();
    FC2.unexport();
    FC3.unexport();
  });



function dpslog(req,res){


IO.emit("messages", {value:req.body.dato});


}



module.exports = {
    dpslog,
    socketSend,
    initAbajo
}