//Service-Now New Call Documentation - Automated v0.7
//v.7 - Finished alert and username handling, almost ready for
//v.5 - Setup for Windows, Chrome, x64
//v.4 - First Commit;
//Joseph Langford
//Template, Caller, ID Number, Phone Number, Remote Assist, FirstCall Resolution, Documentation
//process.argv.slice(2, );

var username = 'jlangford7';
var template = "*change";
var lib_id = "L25599990";
var phoneNum = "+14345925379";
var remoteAssist = true;
var firstCall = true;
var documentation = `
Test Documentation to enter here
`;
var passward = "";

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



driver.findElement(By.name('user_name')).sendKeys(username);
driver.findElement(By.name('user_password')).sendKeys("Joshua98");

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

	driver.sleep(3000);
	userForm.sendKeys(Keys.ARROW_DOWN);
	userForm.sendKeys(Keys.TAB);})
	
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

})
.then(function(){
		if (remoteAssist) {
			driver.executeScript("document.getElementById('new_call.u_webex').setAttribute('value', true);");
			console.log("[+] Checking Used Remote Assistance");

		} else if (firstCall) {
			driver.executeScript("document.getElementById('new_call.u_firstcall_resolution').setAttribute('value', true);")
			console.log("[+] Checking First Call Resolution");

		} else {
			console.log("No boxes to check");

		}

		console.log("[!][!][!] COMPLETE [!][!][!]")

});
