import csv
import regex as RegExp
import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime, date
from dateutil.relativedelta import relativedelta
import pyrebase
import urllib.request
from PIL import Image
import re
import time
from pymongo import MongoClient
import certifi

ca = certifi.where()

print("HELLO WORLD FROM PYTHON\n")

firebaseConfig = {
    "apiKey": "AIzaSyAEX4qHsCDW-WZKWjbIHzezTjndF36JYwU",
    "authDomain": "fir-ab5dc.firebaseapp.com",
    "projectId": "fir-ab5dc",
    "storageBucket": "fir-ab5dc.appspot.com",
    "messagingSenderId": "937448747399",
    "appId": "1:937448747399:web:d3a08e6741c039d00d2322",
    "measurementId": "G-YJLG5WWCT3",
    "serviceAccount": "serviceAccount.json",
    "databaseURL": "https://fir-ab5dc-default-rtdb.firebaseio.com/"
}

# If you are suddenly encountering problems with TLS certificate validation when connecting to Atlas, this is likely
# due to older root certificates used by Let’s Encrypt expiring on Sept 30, 2021 155. MongoDB Atlas uses Let’s
# Encrypt to sign Atlas cluster TLS certificates.
#
# This validation issue is on the client side of the connection, not the server. Your Atlas cluster certificates are
# still valid, but your local trust stores do not contain the new root certificate required for verification.

# Download https://letsencrypt.org/certs/lets-encrypt-r3.pem 918
# rename file .pem to .cer
# double click and install

client = MongoClient(
    "mongodb+srv://ranuja:ranujap00@testcluster.dahry.mongodb.net/?retryWrites=true&w=majority")
print("Connection success")
# print(client.list_database_names())

db = client["test"]

collectionMain = db["attendances"]
collectionTemp = db["dailyAttendances"]

# post = {"empId": 0, "name": "Ranuja", "score": 2}
# collection.insert_one(post)

data = collectionMain.find()
for x in data:
    print(x)

firebase = pyrebase.initialize_app(firebaseConfig)

storage = firebase.storage()

# path = "Images"
images = []
classNames = []

# myList = os.listdir(path)
# print(myList)


files = storage.list_files()
myList2 = []
for file in files:
    url = storage.child(file.name).get_url(None)
    myList2.append(url)

# for cls in myList:
#     currentImg = cv2.imread(f"{path}/{cls}")
#     print(f"IMAGE: {type(currentImg)}")
#     images.append(currentImg)
#     classNames.append(os.path.splitext(cls)[0]) # billgates.jpg -> billgates

# print("Images")
# print(images[0])
# print("Type")
# print(type(images[0]))


for link in myList2:
    print(link)
    imgName = re.split('%2F|.jpg', link)[1]
    classNames.append(imgName)
    print(imgName)
    urllib.request.urlretrieve(link, imgName)

    img = Image.open(imgName)
    # print(img)
    im2arr = np.array(img)  # TYPE: numpy.ndarray
    # images.append(img)
    images.append(im2arr)
    # img.show()

print(classNames)


def find_encodings(imageList):
    encodingList = []
    for img in imageList:
        # img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.cvtColor(img, cv2.COLOR_RGBA2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodingList.append(encode)

    return encodingList


# def mark_attendance(name):
#     with open("../frontend/src/attendance.csv", 'r+') as f:
#         myDataList = f.readlines()
#
#         nameList = []
#         for line in myDataList:
#             entry = line.split(',')
#             nameList.append(entry[0])
#         if name not in nameList:
#             currentTime = datetime.now()
#             dateTimeStr = currentTime.strftime('%H:%M:%S')
#             f.writelines(f'\n{name}, {dateTimeStr}')


encodeListKnown = find_encodings(images)
print("Encoding completed")

cap = cv2.VideoCapture(0)

# t_end = time.time() + 60 * 1
# while time.time() < t_end:
# inFaceDetails = []

while True:
    # inFaceDetails = list(dict.fromkeys(inFaceDetails)) # remove duplicates from the list
    # inTime = list(dict.fromkeys(inTime))  # remove duplicates from the list

    # clear the list everyday at 12.00 am
    if datetime.now().strftime("%X") == "23:59:00":
        for c in classNames:
            print("Name: " + c)
            absentFlag = 1
            for x in collectionTemp.find():
                if c == x["empNo"]:
                    absentFlag = 0
                    break

            if absentFlag == 1:
                dict_faces = {
                    "empNo": c,
                    "timeI": None,
                    "timeO": None,
                    "entryTime": None,
                    "exitTime": None,
                    "date": datetime.now().strftime("%m") + "/" + datetime.now().strftime(
                        "%d") + "/" + datetime.now().strftime("%Y"),
                    "status": "No pay",
                    "workingHrs": 0
                }
                print('Not present: ' + c)
                collectionMain.insert_one(dict_faces)

        myQ = {"date": datetime.now().strftime("%m") + "/" + datetime.now().strftime(
                    "%d") + "/" + datetime.now().strftime("%Y")}
        collectionTemp.delete_many(myQ)

    success, img = cap.read()
    imgSize = cv2.resize(img, (0, 0), None, 0.25, 0.25)
    convImg = cv2.cvtColor(imgSize, cv2.COLOR_BGR2RGB)

    facesCurrentFrame = face_recognition.face_locations(imgSize)
    encodesCurrentFrame = face_recognition.face_encodings(imgSize, facesCurrentFrame)

    for encodeFace, faceLoc in zip(encodesCurrentFrame, facesCurrentFrame):
        matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
        faceDistance = face_recognition.face_distance(encodeListKnown, encodeFace)
        # print(faceDistance)

        # find the lowest elements in the list
        matchIndex = np.argmin(faceDistance)

        if matches[matchIndex]:
            print("Found a face")
            currTime = datetime.now()
            name = classNames[matchIndex].upper()

            # inFaceDetails.append(name)
            dict_faces = {
                "empNo": name,
                "timeI": datetime.now(),
                "timeO": None,
                "entryTime": datetime.now().strftime("%X"),
                "exitTime": None,
                "date": datetime.now().strftime("%m") + "/" + datetime.now().strftime(
                    "%d") + "/" + datetime.now().strftime("%Y"),
                "status": "working",
                "workingHrs": None
            }
            # if len(inFaceDetails) != 0:
            #     # checking present
            #     presentFlag = 0
            #     for d in inFaceDetails:
            #         if name == d["empNo"]:
            #             presentFlag = 1
            #
            #         if d["timeI"] is not None and d["timeO"] is not None:
            #             continue
            #
            #         delta = datetime.now() - d["timeI"]
            #         if delta.total_seconds() > 60 and d["empNo"] == name:
            #             update_filter = {'empNo': name}
            #             newVal = {"$set": {"timeO": datetime.now(), "exitTime": datetime.now().strftime("%X"), "status": "Finished"}}
            #             collection.update_one(update_filter, newVal)
            #
            #             d["timeO"] = datetime.now()
            #             d["exitTime"] = datetime.now().strftime("%X")
            #
            #     if presentFlag == 0:
            #         inFaceDetails.append(dict_faces)
            #         collection.insert_one(dict_faces)
            #
            # else:
            #     inFaceDetails.append(dict_faces)
            #     collection.insert_one(dict_faces)

            if collectionTemp.find() != 0:
                # checking present
                presentFlag = 0
                for d in collectionTemp.find():
                    if name == d["empNo"]:
                        presentFlag = 1
                        delta = datetime.now() - d["timeI"]

                        if d["timeI"] is not None and d["timeO"] is not None:
                            continue

                        elif delta.total_seconds() > 60:
                            d["timeO"] = datetime.now()
                            deltaWorkingHrs = d["timeO"] - d["timeI"]

                            update_filter = {'empNo': name}
                            newVal = {"$set": {"timeO": datetime.now(), "exitTime": datetime.now().strftime("%X"),
                                               "status": "Finished", "workingHrs": round((deltaWorkingHrs.total_seconds()) / 3600.0, 2)}}
                            collectionMain.update_one(update_filter, newVal)
                            collectionTemp.update_one(update_filter, newVal)
                            break

                if presentFlag == 0:
                    # inFaceDetails.append(dict_faces)
                    collectionTemp.insert_one(dict_faces)
                    collectionMain.insert_one(dict_faces)

            else:
                # inFaceDetails.append(dict_faces)
                collectionTemp.insert_one(dict_faces)
                collectionMain.insert_one(dict_faces)

            # print(name)
            y1, x2, y2, x1 = faceLoc
            y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_SCRIPT_SIMPLEX, 1, (255, 255, 255), 2)

            print("Welcome " + name)
            print("Temp Collection")
            temp = collectionTemp.find()
            for x in temp:
                print(x)

        # headerList = ['name', 'TimeIn', 'TimeOut']
        # with open("../frontend/src/attendance.csv", 'r+') as f:
        #     dw = csv.DictWriter(f, delimiter=',', fieldnames=headerList)
        #     dw.writeheader()
        #     for i in inFaceDetails:
        #         f.writelines(f'{i["empNo"]}, {i["entryTime"]}, {i["exitTime"]}\n')

    cv2.imshow("webcam", img)
    cv2.waitKey(1)
