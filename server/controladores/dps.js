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
    clearInterval(ivArriba);
    clearInterval(ivAbajo);
}

function initAbajo (){
  
    flagivAbajo==true;
    dirPin.writeSync(0);
    ivAbajo = setInterval(_ => stepPin.writeSync(stepPin.readSync() ^ 1), 1);
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
        dirPin.writeSync(1);
        ivArriba= setInterval(_ => stepPin.writeSync(stepPin.readSync() ^ 1), 1);
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
        dirPin.writeSync(0);
        ivAbajo = setInterval(_ => stepPin.writeSync(stepPin.readSync() ^ 1), 1);
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
    clearInterval(ivAbajo);
    clearInterval(ivArriba);
    stepPin.writeSync(0);
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
    clearInterval(ivAbajo);
    clearInterval(ivArriba);
    stepPin.writeSync(0);
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
    clearInterval(ivAbajo);
    clearInterval(ivArriba);
    stepPin.writeSync(0);
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
    stepPin.writeSync(0);
    clearInterval(ivAbajo);
    clearInterval(ivArriba);
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