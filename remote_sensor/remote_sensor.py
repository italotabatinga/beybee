import time
import board
import adafruit_dht
from firebase import init_firebase

def init_dht_sensor(pin = board.D18):
  return adafruit_dht.DHT22(pin)

def init_setup():
  # Define pin constants
  ENVIRONMENT_SENSOR_PIN = board.D17
  HIVE_SENSOR_PIN = board.D27

  # Setup Firebase app
  firebase = init_firebase()

  # Initialize DHT Sensor
  environ_sensor = init_dht_sensor(ENVIRONMENT_SENSOR_PIN)
  hive_sensor = init_dht_sensor(HIVE_SENSOR_PIN)

def main():
  while True:
      try:
          # Print the values to the serial port
          temperature_c = dhtDevice.temperature
          temperature_f = temperature_c * (9 / 5) + 32
          humidity = dhtDevice.humidity
          print("Temp: {:.1f} F / {:.1f} C    Humidity: {}% "
                .format(temperature_f, temperature_c, humidity))
  
      except RuntimeError as error:
          # Errors happen fairly often, DHT's are hard to read, just keep going
          print(error.args[0])
  
      time.sleep(2.0)

if __name__ == '__main__':
  pass