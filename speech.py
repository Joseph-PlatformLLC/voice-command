#Speech Recognition - Kicking the tires

import speech_recognition as sr
from msvcrt import getch
import threading
import os

def addToClipBoard(text):
    command = 'echo ' + text.strip() + '| clip'
    os.system(command)

def getCommand():
    r = sr.Recognizer()
    m = sr.Microphone()

    try:
        print("shh! Calibrating microphone")
        with m as source: r.adjust_for_ambient_noise(source)
        print("Set minimum energy threshold to {}".format(r.energy_threshold))

        print("Say a command!")
        with m as source: audio = r.listen(source)
        print("Processing...")

        try:
            # recognize speech using Google Speech Recognition
            value = r.recognize_google(audio)

            if str is bytes: # this version of Python uses bytes for strings (Python 2)
                print(u"You said {}".format(value).encode("utf-8"))
                return(value.encode("utf-8"))


        except sr.UnknownValueError:
            print("Oops! Didn't catch that")
        except sr.RequestError as e:
            print("Uh oh! Couldn't request results from Google Speech Recognition service; {0}".format(e))

    except KeyboardInterrupt:
        pass

def parseCommand(text):
    if "clipboard" in text:
        addToClipBoard(text.strip("clipboard"))



while True:
    key = ord(getch())
    if key == 27: #ESCasasdf
        print("Escape pressed, exiting..")
        break
    elif key == 13: #Enter
        parseCommand(getCommand())
