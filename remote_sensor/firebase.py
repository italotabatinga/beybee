import pyrebase

def init_firebase():
  config = {
    "apiKey": "AIzaSyCNOgllgmUL07HoWCvVvS8gNpz4_nZaj1s",
    "authDomain": "bey-bee.firebaseapp.com",
    "databaseURL": "https://bey-bee.firebaseio.com",
    "projectId": "bey-bee",
    "storageBucket": "bey-bee.appspot.com",
    "messagingSenderId": "1006733582500",
    "appId": "1:1006733582500:web:247ce02e7ed7c16c0d8631",
    "measurementId": "G-K30KZ4KKVG"
  }

  return pyrebase.initialize_app(config)