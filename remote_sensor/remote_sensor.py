import time
import adafruit_dht
from firebase import init_firebase
import logging


def init_dht_sensor(pin=18):
    return adafruit_dht.DHT22(pin)


def init_setup():
    # Define pin constants
    ENVIRONMENT_SENSOR_PIN = 17
    HIVE_SENSOR_PIN = 27

    # Setup Firebase app
    firebase = init_firebase()

    # Initialize DHT Sensor
    environ_sensor = init_dht_sensor(ENVIRONMENT_SENSOR_PIN)
    hive_sensor = init_dht_sensor(HIVE_SENSOR_PIN)

    return firebase, environ_sensor, hive_sensor


def init_logging(level=logging.INFO):
    logging.basicConfig(format='%(asctime)s - %(message)s',
                        datefmt='%d-%b-%y %H:%M:%S')
    logger = logging.getLogger(__name__)
    logger.setLevel(level)

    return logger


def main():
    firebase, environ_sensor, hive_sensor = init_setup()
    database = firebase.database()
    logger = init_logging()
    while True:
        try:
            moment = time.time()

            environ_temperature = environ_sensor.temperature
            environ_humidity = environ_sensor.humidity
            hive_temperature = hive_sensor.temperature
            hive_humidity = hive_sensor.humidity

            database.child('environment_sensor').push({
                "temperature": environ_temperature,
                "humidity": environ_humidity,
                "captured_at": moment
            })
            logger.debug('Captured ENVIRON: temp: {:.2f} humid: {:.2f}'.format(
                environ_temperature, environ_humidity))

            database.child('hive_sensor').push({
                "temperature": hive_temperature,
                "humidity": hive_humidity,
                "captured_at": moment
            })
            logger.debug('Captured HIVE: temp: {:.2f} humid: {:.2f}'.format(
                hive_temperature, hive_humidity))

        except RuntimeError as error:
            # Errors happen fairly often, DHT's are hard to read, just keep going
            logger.warn(error.args[0])

        time.sleep(5.0)


def name():
    return __name__


if __name__ == '__main__':
    main()
