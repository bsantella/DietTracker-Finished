import json
from UserProfile import UserProfile
from flask import Flask, render_template, request, redirect, url_for
from flask_login import LoginManager
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient

app = Flask(__name__)

loginu = LoginManager(app)

uri = "mongodb+srv://Editor:Code9@diet-tracker.ncrahr5.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client.DietTracker

@app.route('/createaccount', methods=['POST'])
def createAccount():
    coll = db.Users

    firstname = request.form.get('firstName')
    lastname = request.form.get('lastName')
    username = request.form.get('userName')
    password = request.form.get('password')

    #will return if user under given username already exists
    existCheck = coll.find_one({"name": username})
    if existCheck:
        return redirect(url_for('.signup_post')) #ideally would redirect to blank signup form
    
    #add new user data to database
    passhash = password #generates a hash which is what the database will store
    new_user = coll.insert_one({"name": username, "password": passhash, "firstname": firstname, "lastname":  lastname}) #inserts new user into Users collection
    #redirect user to login page after successful registration
    return "Success"

@app.route('/dashboard')
def dashboard():
    if request.method == "GET":
        return "This is the dashboard"
    elif request.method == "POST":
        return "test"

@app.route("/editprofile", methods=['GET', 'POST'])
def editProfile():
    if request.method == "GET":
        #get curr user session from db
        coll = db.TrackerData
        search = coll.find_one()
        searchlist = list(search.values())
        searchUser = searchlist[1] #current User
        #For response body, call GET functions for user data inside json variable
        coll = db.Users
        result = coll.find_one({"name": searchUser})
        qresult = list(result.values())
        if len(qresult) > 5: #if the current user has profile data already in the db, preload fields
            response_body = {
                'userName' : str(qresult[1]),
                'password' : str(qresult[2]),
                'height' : int(qresult[8]),
                'age' : int(qresult[5]),
                'gender' : str(qresult[7]),
                'weight' : int(qresult[9]),
                'flag' : int(qresult[6])
            }
            print('userName', str(qresult[1]),
                '\npassword', str(qresult[2]),
                '\nheight', int(qresult[8]),
                '\nage', int(qresult[5]),
                '\ngender', str(qresult[7]),
                '\nweight', int(qresult[9]),
                '\nflag', int(qresult[6]))
            return response_body
        else: #otherwise leave certain fields blank
            response_body = {
                "userName" : str(qresult[1]),
                "password" : str(qresult[2])
            }
            return response_body

    elif request.method == "POST":
        #To get specific variable from json file, call request.form.get(<variable name>)
        response_body = request.form
        #get curr user session from db
        coll = db.TrackerData
        search = coll.find_one()
        searchlist = list(search.values())
        searchUser = searchlist[1] #current User
        #retrieve info from React fields
        username = request.form.get('userName')
        password = request.form.get('password')
        age = request.form.get('age')
        flag = request.form.get('flag')
        gender = request.form.get('gender')
        height = request.form.get('height')
        weight = request.form.get('weight')
        #store info in current userProfile
        #currentSession.setHeight(height)
        #currentSession.setAge(age)
        #currentSession.setSexMale(gender)
        #currentSession.setWeight(weight)
        #update database with new info
        coll = db.Users
        oldDoc = {"name": searchUser}
        newDoc = { "$set": {
            "name": username,
            "password": password,
            "height": height,
            "age" : age,
            "gender" : gender,
            "weight" : weight,
            "flag" : flag
            }}
        coll.update_one(oldDoc, newDoc)
        return response_body

@app.route("/tracker", methods=['GET', 'POST'])
def tracker():
    if request.method == "GET":
        #get curr user session from db
        coll = db.TrackerData
        search = coll.find_one()
        searchlist = list(search.values())
        searchUser = searchlist[1] #current User
        coll = db.Users
        result = coll.find_one({"name": searchUser})
        qresult = list(result.values())
        #load session user data for calculations
        sessionUserProf = UserProfile(qresult[1], qresult[2], qresult[3], qresult[4], qresult[0])
        sessionUserProf.setHeight(qresult[8])
        sessionUserProf.setAge(qresult[5])
        sessionUserProf.setSexMale(False)
        sessionUserProf.setWeight(qresult[9])
        sessionUserProf.setExerciseLevel(qresult[6])
        #precalc totalcals to set bmr
        precalcCals = sessionUserProf.totalCalNeeds()
        #calc and return everything else
        response_body = {
            "calories" : sessionUserProf.getCalories(),
            "protein" : sessionUserProf.getProtein(),
            "carbohydrates" : sessionUserProf.getCarbs(),
            "fat" : sessionUserProf.getFat()
        }
        coll = db.MealData
        oldUserj = {"name": searchUser}
        newUserj = {"$set": {"name" : searchUser, 
                            "totalCalories" : sessionUserProf.totalCalories,
                            "totalProtein" : sessionUserProf.totalProtein,
                            "totalCarbs" : sessionUserProf.totalCarbs,
                            "totalFat" : sessionUserProf.totalFat,
                            "isMale" : sessionUserProf.isMale,
                            "BMR" : sessionUserProf.BMR}}
        coll.update_one(oldUserj, newUserj)
        return response_body
        
    elif request.method == "POST":
        response_body = request.form
        #get curr user session from db
        coll = db.TrackerData
        search = coll.find_one()
        searchlist = list(search.values())
        searchUser = searchlist[1] #current User
        #retrieve info from React fields
        cals = request.form.get("calories")
        protein = request.form.get("protein")
        carbs = request.form.get("carbohyrates")
        fat = request.form.get("fat")
        #store in db
        coll = db.MealData
        oldUserj = {"name": searchUser}
        newUserj = {"$set": {"name" : "Demo", 
                            "totalCalories" : cals,
                            "totalProtein" : protein,
                            "totalCarbs" : carbs,
                            "totalFat" : fat,
                            }}
        coll.update_one(oldUserj, newUserj)
        return response_body

@app.route("/tracker/search", methods=['GET', 'POST'])
def search():
    if request.method == "GET":
        return "This is the search page"
    elif request.method == "POST":
        return "test"

@app.route("/notepad", methods=['GET', 'POST'])
def notepad():
    if request.method == "GET":
        return "This is the notepade page"
    elif request.method == "POST":
        return "test"

@app.route('/userinfo/<username>', methods=['GET', 'POST'])
def userlogin(username):
    if request.method == "GET":
        db = client.DietTracker
        coll = db.Users
        result = coll.find_one({"name": username}, {"_id": 0})
        qresult = list(result.values())
        qres = ("User ID: " + str(qresult[0]) + "\nUser Name: " + str(qresult[1]) + "\nHeight(inches): " + str(qresult[3]) + "\nWeight(lbs): " + str(qresult[4]) + "\nExercise Class: " + str(qresult[5]))
        return qres
    elif request.method == "POST":
        return "test"   

@app.route('/signup', methods=['POST'])
def signup_post():
    coll = db.Users

    firstname = request.form.get('firstName')
    lastname = request.form.get('lastName')
    username = request.form.get('userName')
    password = request.form.get('password')

    #will return if user under given username already exists
    existCheck = coll.find_one({"name": username})
    if existCheck:
        return redirect(url_for('.signup_post')) #ideally would redirect to blank signup form
    
    #add new user data to database
    passhash = password #generates a hash which is what the database will store
    new_user = coll.insert_one({"name": username, "password": passhash, "firstname": firstname, "lastname":  lastname}) #inserts new user into Users collection
    #redirect user to login page after successful registration
    return redirect(url_for('.login_post'))

@app.route('/', methods=['POST'])
def login_post():
    db = client.DietTracker
    coll = db.Users
    # login code
    username = request.form.get('userName')
    password = request.form.get('password')

    #check enterted details
    user = coll.find_one({"name": username})
    if not user: #if username doesn't match db
        return {"check": "Fail"}
    uservals = list(user.values())
    currentUserName = uservals[1]
    currentUserHash = uservals[2]
    if not (currentUserHash == password): #if pass is wrong
        return {"check": "Fail"}
    #create session in db for user
    coll = db.TrackerData
    search = coll.find_one()
    searchlist = list(search.values())
    searchUser = searchlist[1]
    oldUserj = {"currentUser": searchUser}
    newUserj = {"$set": {"currentUser" : currentUserName}}
    coll.update_one(oldUserj, newUserj)
    #global sessionPass
    #sessionPass = password
    print("currentUserName:", currentUserName)
    print("retrieved username:", username)
    print("retrieved password:", password)
    print(oldUserj)
    print(newUserj)
    #passing both checks means user is verified
    return {"check": "Success"}

    


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
