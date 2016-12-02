from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.alert import Alert
import selenium.common.exceptions
from time import sleep

hd_username = "jlangford7"
hd_password = "Joshua98"

class BrowserDriver:
    def __init__(self, username, password):
        self.driver = webdriver.Chrome(executable_path="C:/scripts/helper/em.io/chromedriver.exe")
        self.hd_username = username
        self.hd_password = password
        self.c_username = ""
        self.c_luid = ""
        self.c_phonenumber = ""
        self.c_template = "Account Access (Change Password)"
        self.c_documentation = """
        Validated Last 4 of Social Security Number,
        Validated Date of Birth,
        Validated ZIP code
        """

    def closeBrowser(self):
        self.driver.close()

    def getFinesse(self):
        self.driver.get('https://lufinesse01.phones.liberty.edu/')

        self.element = self.driver.find_element_by_name('j_username')
        self.element.send_keys("jlangford7")
        self.element = self.driver.find_element_by_name('j_password')
        self.element.send_keys("Langford5379")
        self.element = self.driver.find_element_by_name("extension_login_user")
        self.element.send_keys("5925379")
        self.element = self.driver.find_element_by_id("signin-button")
        self.element.click()

    def getServiceNowSignIn(self):
        self.driver.get('https://liberty.service-now.com/ess/home.do')

        try:
            self.element = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.NAME, "user_name"))
            )
        except:
            self.driver.quit()
        username = self.driver.find_element_by_name('user_name')
        password = self.driver.find_element_by_name('user_password')

        username.send_keys(self.hd_username)
        password.send_keys(self.hd_password)
        password.send_keys(Keys.RETURN)

        try:
            Alert(self.driver).accept()
        except:
            print "No Service-Now alert to handle."

    def storeCallerData(self, lu_id, username, phone_number):
        self.c_username = username
        self.c_luid = lu_id
        self.c_phonenumber = phone_number


    def retrieveCallData(self):

        try:
            a0 = open('../aext0.txt')
            user_info = a0.readlines()[1:]
            lu_id, username, last4, dob, address, zip_code, phone_number = user_info[0].split('\t')
            username = username.lower()

            self.storeCallerData(lu_id, username, phone_number)

        except:
            print "Error with aext0 processing. This isn't unusual"

        try:
            a1 = open('../aext1.txt')

        except:
            print "Error with aext1 processing. This isn't unusual"

        try:
            a2 = open('../aext2.txt')
            notes = a2.readlines()[1:]
            for note in notes:
                print note.split('\t')[1]

        except:
            print "Error with aext2 processing. This isn't unusual"

        try:
            a3 = open('../aext3.txt')
            flags = a3.readlines()[1:]
            fraudAlert, legalAction, asistDisabled = flags[0].split('\t')
            print '[-] Fraud Alert: {0} \n[-] Legal Action: {1} \n[-] Assist Disabled: {2}'.format(fraudAlert, legalAction, asistDisabled)

        except:
            print "Error with aext3 processing. This isn't unusual"


    def openNewCall(self):
        self.driver.get('https://liberty.service-now.com/new_call.do?sysparm_stack=new_call_list.do&sys_id=-1')
        try:
            self.element = WebDriverWait(self.driver, 6).until(
                EC.presence_of_element_located((By.ID, "sys_display.new_call.u_caller"))
            )
        except:
            url = self.driver.current_url
            if (url == 'https://liberty.service-now.com/ess/home.do'):
                self.getServiceNowSignIn()
            else:
                self.driver.close()
        finally:
            template = self.driver.find_element_by_id('sys_display.new_call.u_template')
            template.send_keys(self.c_template)
            sleep(3)
            template.send_keys(Keys.ARROW_DOWN)

            username = self.driver.find_element_by_id('sys_display.new_call.u_caller')
            username.send_keys(self.c_username)
            sleep(3)
            username.send_keys(Keys.ARROW_DOWN)

            id_number = self.driver.find_element_by_id('new_call.u_id_number')
            id_number.send_keys(self.c_luid)

            phone_number = self.driver.find_element_by_id('new_call.u_phone_number')
            work_notes = self.driver.find_element_by_id('new_call.work_notes')

            work_notes.send_keys(self.c_documentation)





sn = BrowserDriver(hd_username, hd_password)
sn.getServiceNowSignIn()
sn.retrieveCallData()
sn.openNewCall()
sleep(10)
sn.closeBrowser()
