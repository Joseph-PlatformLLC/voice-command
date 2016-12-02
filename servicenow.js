//Service-Now New Call Documentation - Automated v0.7
//v.7 - Finished alert and username handling, almost ready for
//v.5 - Setup for Windows, Chrome, x64
//v.4 - First Commit;
//Joseph Langford
//Template, Caller, ID Number, Phone Number, Remote Assist, FirstCall Resolution, Documentation
//process.argv.slice(2, );
//node servicenow.js [username] [lib_id] [phoneNum] [hd_username] [hd_password]
var username = process.argv[2];
var lib_id = process.argv[3];
var phoneNum = process.argv[4];
var hd_username = process.argv[5];
var hd_password = process.argv[6];

var template = "*change";
var remoteAssist = true;
var firstCall = true;
var documentation = `
Test Documentation to enter here
`;


const webdriver = require('selenium-webdriver'),
	By = webdriver.By,
	until = webdriver.until;
const Capabilities = require('selenium-webdriver/lib/capabilities').Capabilities;
const Keys = require('selenium-webdriver/lib/input').Key;
var capabilities = Capabilities.chrome();

var driver = new webdriver.Builder()
	.forBrowser('chrome')
	.withCapabilities(capabilities)
	.build();





driver.get('https://liberty.service-now.com/ess/home.do')
.then(function(){
	console.log("[+] Browser built");
	console.log("[>] Login Page")
	driver.wait(until.elementLocated(By.name('user_name')));

});



driver.findElement(By.name('user_name')).sendKeys(hd_username);
driver.findElement(By.name('user_password')).sendKeys(hd_password);

//submit form
driver.findElement(By.className('cms_header_login_button')).then(function(login_button) {
	console.log("[+] Form filled - Submitting Login Form..");
	login_button.click();
});


//Wait until "Logout" Link Appears
driver.wait(until.elementLocated(By.className('cms_header_login_link')))
.then(function(){
	driver.switchTo().alert().then(
	  function() {
			console.log("[~] Alert Detected - Handling..");
	    driver.switchTo().alert().accept();
			console.log("[+] Alert Handled");

		},

		function() {
	    console.log("[+] No Alert to Handle");

	  }
);



	console.log("[+] Logged in");
	//GET new call form from service-now
	driver.get('https://liberty.service-now.com/new_call.do?sysparm_stack=new_call_list.do&sys_id=-1')
	console.log("[>] New Call Page");
});


driver.findElement(By.id('sys_display.new_call.u_caller')).then(function(callerForm){
	callerForm.sendKeys(username);
	console.log("[+] Caller");

	return driver.findElement(By.id('sys_readonly.new_call.u_username'))
})
.then(function(userForm){
	userForm.sendKeys(Keys.ARROW_DOWN);
	userForm.sendKeys(Keys.TAB);
	driver.sleep(3000);
})
.then(function() {
	console.log("[-] Simulating Wait...");

	return driver.findElement(By.id('new_call.u_id_number'))
})
.then(function(idNumber) {
	idNumber.sendKeys(lib_id);
	console.log("[+] Handled");


	return driver.findElement(By.id('new_call.u_phone_number'))

})
.then(function(phoneNumber){
	if (phoneNum !== ""){
		phoneNumber.clear();
		console.log("[-] Clearing Stored Phone Number");
	}
	phoneNumber.sendKeys(phoneNum);
	console.log("[+] Phone Number");

	return driver.findElement(By.id('sys_display.new_call.u_template'))

})
.then(function(templateForm){
	templateForm.click();
	templateForm.sendKeys(template);
	console.log("[-] Simulating wait..");
	return driver.findElement(By.id('sys_display.new_call.u_template'))
})
.then(function(templateForm){
	driver.sleep(3000);
	templateForm.sendKeys(Keys.ARROW_DOWN);
	templateForm.sendKeys(Keys.TAB);
	return driver.findElement(By.id('new_call.work_notes'));

})
.then(function(workNotes){
	console.log("[+] Documentation");
	workNotes.sendKeys(documentation);
	return driver.findElement(By.id('sys_display.new_call.u_department'))
})
.then(function(department){

		console.log("[!][!][!] COMPLETE [!][!][!]")

});
