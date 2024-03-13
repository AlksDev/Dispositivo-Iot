

#include <WiFi.h>
#include <Wire.h>
#include "ABlocks_LiquidCrystal_I2C.h"
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <ThingSpeak.h>

LiquidCrystal_I2C lcd_1(0x27, 16, 2);


const char *ssid = "Kevin's Galaxy S22+";
const char *password = "kevin1234";
#define THINGSPEAK_APIKEY "AB4NUXMB4OZ9EFO9" // Reemplaza con tu clave de API de ThingSpeak
#define THINGSPEAK_CHANNEL_ID 2347639 // Reemplaza TU_ID_DE_CANAL con el ID de tu canal de ThingSpeak
WiFiClient client;
const int pinRelay = 23;
const int pinTrigger = 4;
const int pinEcho = 5;
const int buzzer = 25;

long duration;
int distance;
IPAddress ip(192, 168, 1, 6); // Cambiar la IP estática si es necesario
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);
AsyncWebServer server(80);

void setup() {
  Serial.begin(115200);

  pinMode(pinRelay, OUTPUT);
  pinMode(pinTrigger, OUTPUT);
  pinMode(pinEcho, INPUT);
  pinMode(buzzer, OUTPUT);
   lcd_1.begin();
  lcd_1.noCursor();
  lcd_1.backlight();

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conexión WiFi establecida");

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(200, "text/html", "<button onclick=\"toggleRelay()\">Toggle Relay</button><script>function toggleRelay(){var xhr=new XMLHttpRequest();xhr.open('GET','/toggle',true);xhr.send();}</script>");
  });
  
  server.on("/distance", HTTP_GET, [](AsyncWebServerRequest *request){
    String content = "Distancia: " + String(distance) + " cm";
    request->send(200, "text/plain", content);
  });

  server.on("/toggle", HTTP_GET, [](AsyncWebServerRequest *request){
    digitalWrite(pinRelay, !digitalRead(pinRelay));
    request->send(200, "text/plain", digitalRead(pinRelay) ? "Relay Encendido" : "Relay Apagado");
  });

  server.begin();
  Serial.println("Servidor iniciado");
}

void loop() {
  digitalWrite(pinTrigger, LOW);
  delayMicroseconds(2);
  digitalWrite(pinTrigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(pinTrigger, LOW);

  duration = pulseIn(pinEcho, HIGH);
  distance = duration * 0.034 / 2;

  Serial.print("Distancia: ");
  Serial.println(distance);
  
// Envia los datos a ThingSpeak
    ThingSpeak.begin(client);
    ThingSpeak.writeField(THINGSPEAK_CHANNEL_ID, 2, distance, THINGSPEAK_APIKEY);
  
    lcd_1.clear();
    lcd_1.setCursor(0, 0);
    lcd_1.print(String("Dist: ") + String(distance) + String(" cm"));


  if (distance > 2) {
    digitalWrite(pinRelay, LOW); // Encender el relé si la distancia es mayor a 10 cm
    }
  else {
    digitalWrite(pinRelay, HIGH); // Apagar el relé si la distancia es menor o igual a 10 cm
  }

  if (distance >= 0 && distance <=2){
      tone(buzzer, 1000,500);
    }

  delay(1000); // Esperar un segundo antes de realizar otra lectura
}
