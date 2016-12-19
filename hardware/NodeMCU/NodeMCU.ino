/*
 *  This sketch demonstrates how to scan WiFi networks. 
 *  The API is almost the same as with the WiFi Shield library, 
 *  the most obvious difference being the different file you need to include:
 */
#include "ESP8266WiFi.h"
#include "ESP8266HTTPClient.h"
#include "SoftwareSerial.h"

HTTPClient httpClient;
SoftwareSerial mySerial(D7, D8); 

const char* ssid     = "SSID";
const char* password = "PASSWORD";
char oldCode = '9';

void setup() {
  Serial.begin(115200);

  mySerial.begin(115200);
  while(mySerial.available())mySerial.read();
  // Set WiFi to station mode and disconnect from an AP if it was previously connected
  WiFi.mode(WIFI_STA);

  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  httpClient.begin("http://mawhai.herokuapp.com/location");

}

void getMessage(){
  
  httpClient.begin("http://mawhai.herokuapp.com/mode");
  int res = httpClient.GET();
  Serial.println(res);
  
  if(res == HTTP_CODE_OK){
      char code = httpClient.getString().charAt(0);
        
        if(code != oldCode){
          Serial.print("X");
          Serial.println(code);
          mySerial.write(code);
          oldCode = code;
        }
    }
    
}

void sendData(){
  
  httpClient.begin("http://mawhai.herokuapp.com/location");
  httpClient.addHeader("Content-Type", "application/x-www-form-urlencoded");

  int n = WiFi.scanNetworks();

  if (n != 0){
    String data = "macaddress=";
    int x =0;
    for (int i = 0; i < n; ++i){
      if(WiFi.SSID(i) == "KUWIN"){
     
          if(x!=0){
              data += ',';
            }
            x++;
            data+= WiFi.BSSIDstr(i);
        }       
    }
    
    httpClient.POST(data);
    httpClient.writeToStream(&Serial);
  }
}

void loop() {

  getMessage();
  sendData();

 

//  if(mySerial.available())  
//    Serial.println(mySerial.read());
  delay(5000);

  
}
