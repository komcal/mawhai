#include "SoftwareSerial.h"

SoftwareSerial mySerial(PIN_PB1, PIN_PB0);

boolean LIGHT_BLINK = true;
int LIGHT_MODE = 1;
boolean AUTO_TOGGLE = false;

void setup() {
  // put your setup code here, to run once:
  pinMode(PIN_PC0, OUTPUT);
  pinMode(PIN_PC1, OUTPUT);
  pinMode(PIN_PC2, OUTPUT);

  pinMode(PIN_PC4, INPUT);


  pinMode(PIN_PD0, OUTPUT);
  pinMode(PIN_PD1, OUTPUT);
  pinMode(PIN_PD2, OUTPUT);

  mySerial.begin(115200);
  while(mySerial.available())mySerial.read();
}

void lightOff(){
  digitalWrite(PIN_PC0, LOW);
  digitalWrite(PIN_PC1, LOW);
  digitalWrite(PIN_PC2, LOW);  
  
  digitalWrite(PIN_PD0, LOW);
  digitalWrite(PIN_PD1, LOW);
  digitalWrite(PIN_PD2, LOW);

  delay(50);
  
}

void lightOn(){
  digitalWrite(PIN_PC0, HIGH);
  digitalWrite(PIN_PC1, HIGH);
  digitalWrite(PIN_PC2, HIGH);
  
  digitalWrite(PIN_PD0, HIGH);
  digitalWrite(PIN_PD1, HIGH);
  digitalWrite(PIN_PD2, HIGH);
  
  
  delay(50);
  if(LIGHT_BLINK){
      lightOff();

  }
}

void lightOnMode(){
  lightOn();  
}

void readMessage(){
    if(mySerial.available()){
        char x;
        do{ x = mySerial.read();
          }
          while(x>'9');
        switch(x){
            case '0': LIGHT_BLINK = false;
                      LIGHT_MODE = 0;
                     // mySerial.write('A');
                      break;
            case '1': LIGHT_BLINK = false;
                      LIGHT_MODE = 1;
                     // mySerial.write('B');
                      break;
            case '2': LIGHT_BLINK = false;
                      LIGHT_MODE = 2;
                     // mySerial.write('C');
                      break;
            case '3': LIGHT_BLINK = true;
                      LIGHT_MODE = 0;
                     // mySerial.write('D');
                      break;
            case '4': LIGHT_BLINK = true;
                      LIGHT_MODE = 1;
                     // mySerial.write('E');
                      break;                                                
            case '5': LIGHT_BLINK = true;
                      LIGHT_MODE = 2;
                     // mySerial.write('F');
                      break;   
          }
        mySerial.write(x);
      }

      
}

void lightAutoMode(){
  if(AUTO_TOGGLE){
      lightOn();
      if(analogRead(PIN_PC4) >= 350){
        AUTO_TOGGLE = false;  
      }
   } else if(analogRead(PIN_PC4) <= 200){
      AUTO_TOGGLE = true;
   } else {
      lightOff();   
   }
    
}

void loop() {
  readMessage();

  
  switch(LIGHT_MODE){
    case 2: lightAutoMode(); break;
    case 1: lightOnMode(); break;
    case 0: lightOff(); break;
   }

  // mySerial.write('G');
   

}


