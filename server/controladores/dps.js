const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const serialPort = new SerialPort('/dev/ttyUSB0', {
  baudRate: 9600
})

const parser = new Readline()
serialPort.pipe(parser)

parser.on('data', line => console.log(`> ${line}`))



var Gpio = require('onoff').Gpio;
var LED1 = new Gpio(23, 'out');
var LED2 = new Gpio(24, 'out');
var LED3 = new Gpio(25, 'out');

var stepPin = new Gpio(17, 'out');
var dirPin = new Gpio(27, 'out');
var EnPin = new Gpio(22, 'out');


var Arriba = new Gpio(5, 'in', 'both');
var Abajo = new Gpio(6, 'in', 'both');
var FC0 = new Gpio(12, 'in', 'both');
var FC1 = new Gpio(26, 'in', 'both');
var FC2 = new Gpio(19, 'in', 'both');
var FC3 = new Gpio(13, 'in', 'both');

var IO;

var flagAction = false;
var flagAbajo = false;
var flagArriba = false;


function socketSend(io) {

  IO = io;
  EnPin.writeSync(0);

}

function initAbajo() {

  flagAction = true;
  flagAbajo = true;
  dirPin.writeSync(0);
  serialPort.write("2\r\n");
  console.error('buscando Abajo');
  IO.emit("messages", "buscando Abajo");

}

Arriba.watch(function (err, value) {
  if (err) {
    console.error('There was an error', err);
    return;
  }

  if (value == 0 && flagAction == false) {
    flagAction = true;
    flagArriba = true;
    serialPort.write("1\r\n");
    console.log('buscando Arriba');
    IO.emit("messages", "buscando Arriba");
  }
});


Abajo.watch(function (err, value) {
  if (err) {
    console.error('There was an error', err);
    return;
  }
  if (value == 0 && flagAction == false) {
    flagAction = true;
    flagAbajo = true;
    serialPort.write("2\r\n");
    console.log('buscando Abajo');
    IO.emit("messages", "buscando Abajo");
  }
});


FC0.watch(function (err, value) {
  if (err) {
    console.error('There was an error', err);
    return;
  }
  if (value == 0 && flagAction == true && flagArriba == false) {
    flagAction = false;
    flagAbajo = false;
    console.log('FC0');
    IO.emit("messages", "nivel0");
    serialPort.write("3\r\n");
    LED1.writeSync(0);
    LED2.writeSync(0);
    LED3.writeSync(0);
  }
});

FC1.watch(function (err, value) {
  if (err) {
    console.error('There was an error', err);
    return;
  }
  if (value == 0 && flagAction == true && flagAbajo == false) {
    flagAction = false;
    flagArriba = false;
    console.log('FC1');
    IO.emit("messages", "nivel1");
    serialPort.write("3\r\n");
    LED1.writeSync(1);
    LED2.writeSync(0);
    LED3.writeSync(0);
  }
});

FC2.watch(function (err, value) {
  if (err) {
    console.error('There was an error', err);
    return;
  }
  if (value == 0 && flagAction == true && flagAbajo == false) {
    flagAction = false;
    flagArriba = false;
    console.log('FC2');
    IO.emit("messages", "nivel2");
    serialPort.write("3\r\n");
    LED1.writeSync(0);
    LED2.writeSync(1);
    LED3.writeSync(0);
  }
});

FC3.watch(function (err, value) {
  if (err) {
    console.error('There was an error', err);
    return;
  }
  if (value == 0 && flagAction == true && flagAbajo == false) {
    flagAction = false;
    flagArriba = false;
    console.log('FC2');
    IO.emit("messages", "nivel3");
    serialPort.write("3\r\n");
    LED1.writeSync(0);
    LED2.writeSync(0);
    LED3.writeSync(1);
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



function dpslog(req, res) {


  IO.emit("messages", {
    value: req.body.dato
  });


}



module.exports = {
  dpslog,
  socketSend,
  initAbajo
}