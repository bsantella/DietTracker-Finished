import UserProfile

class Commands:
    uniqueUserID = 1

    def searchResults(search):
        reults = []

    def createAccount(firstName, lastName, userName, password):
        newUser = UserProfile(userName, password, firstName, lastName, f'{uniqueUserID:09d}')
        return newUser

    