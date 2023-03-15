class UserProfile:

    foodList = []
    totalCalories = 0
    totalProtein = 0
    totalCarbs = 0
    totalFat = 0
    height = 0
    age = 0
    isMale = True
    weight = 0
    exerciseLevel = 1
    BMR = 0

    def __init__(self, userName, password, firstName, lastName, accountNum):
        self.userName = userName
        self.password = password
        self.firstName = firstName
        self.lastName = lastName
        self.accountNum = accountNum

    def getAccountNum():
        return accountNum

    def setHeight(self, height):
        self.height = height

    def getHeight(self):
        return self.height
    
    def setAge(self, age):
        self.age = age

    def getAge(self):
        return self.age

    def setSexMale(self, isMale):
        self.isMale = isMale

    def getSexMale(self):
        return self.isMale

    def setWeight(self, weight):
        self.weight = weight

    def getWeight(self):
        return self.weight

    def setNotePadID(self, noteID):
        self.noteID = noteID

    def getNotePadID(self):
        return self.noteID
    
    def setExerciseLevel(self, exerciseLevel):
        self.exerciseLevel = exerciseLevel

    def displayUserName(self):
        print(self.userName)

    def setCalories(self, calories):
        self.calories = calories

    def getCalories(self):
        return self.calories

    def getTotalCalories(self):
        self.totalCalories = self.totalCalories + self.getCalories
        return self.totalCalories

    def setProtein(self, protein):
        self.protein = protein

    def getProtein(self):
        return self.protein

    def getTotalProtein(self):
        self.totalProtein = self.totalProtein + self.getProtein
        return self.totalProtein

    def setCarbs(self, carbs):
        self.carbs = carbs

    def getCarbs(self):
        return self.carbs

    def getTotalCarbs(self):
        self.totalCarbs = self.totalCarbs + self.getCarbs
        return self.totalCarbs

    def setFat(self, fat):
        self.fat = fat

    def getFat(self):
        return self.fat

    def getTotalFat(self):
        self.totalFat = self.totalFat + self.getFat
        return self.totalFat

    def toKilos(pounds):
        kilos = pounds / 2.205
        return kilos

    def toCentimeters(inches):
        cm = inches * 2.54
        return cm

    def totalCalNeeds(self):
        if self.isMale:
            self.BMR = 66 + (13.7 * self.toKilos(self.getWeight()) + (5 * self.toCentimeters(self.getHeight())) - (6.8 * self.getAge()))
        else:
            self.BMR = 655 + (9.6 * self.toKilos(self.getWeight()) + (1.8 * self.toCentimeters(self.getHeight())) - (4.7 * self.getAge()))
        self.BMR = self.BMR * 1.55
        return self.BMR

    def totalCarbNeeds(self):
        totalCarbs = self.BMR * 0.5
        totalCarbs = totalCarbs/4
        totalCarbs = int(totalCarbs)
        return totalCarbs

    def totalFatNeeds(self):
        totalFat = self.BMR * 0.25
        totalFat = totalFat/9
        totalFat = int(totalFat)
        return totalFat

    def totalProteinNeeds(self):
        totalProtein = self.BMR * 0.15
        totalProtein = totalProtein/4
        totalProtein = int(totalProtein)
        return totalProtein


