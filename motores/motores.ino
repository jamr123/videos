const int dirPin = 8;
const int stepPin = 9;
int microPausa = 1000;
char option = '3';
int val = 0;

int periodo = 100;
unsigned long TiempoAhora = 0;

void setup() {
  pinMode(dirPin, OUTPUT);
  pinMode(stepPin, OUTPUT);
  Serial.begin(9600);

}
void loop() {

  
  if (millis() > TiempoAhora + periodo) {

    if (Serial.available() > 0) {
      option = Serial.read();
    }
   if(option=='3'){
    val=3;
    }

    if(option=='2'){
    Serial.println("abajo");
    digitalWrite(dirPin, LOW);
    val=2;
    }
    if(option=='1'){
    Serial.println("arriba");
    digitalWrite(dirPin, HIGH);
    val=1;
    }
    
    TiempoAhora = millis();

  }


  switch (val) {
    case 3:
      Serial.println("stop");
      delay(1000);
      break;
    case 1:
      arriba();
      break;
    case 2:
      abajo();
      break;
  }


}

void arriba() {
  
  digitalWrite(stepPin, HIGH);
  delayMicroseconds(microPausa);
  digitalWrite(stepPin, LOW);
  delayMicroseconds(microPausa);
}

void abajo() {
  
  digitalWrite(stepPin, HIGH);
  delayMicroseconds(microPausa);
  digitalWrite(stepPin, LOW);
  delayMicroseconds(microPausa);
}
