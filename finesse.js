// Initialize

//The const declaration creates a read-only reference to a value.
//It does not mean the value it holds is immutable,
//just that the variable identifier cannot be reassigned.

const webdriver = require('selenium-webdriver'),
	By = webdriver.By,
	until = webdriver.until;

const logging = require('selenium-webdriver/lib/logging')
const Capabilities = require('selenium-webdriver/lib/capabilities').Capabilities;

//Load Addon archive to disable Cross-Origin-Request block for reading Finesse iFrames

// Set capabilites for the project and enable Firefox 47+ Compatibilty
var capabilities = Capabilities.chrome();
// capabilities.set('marionette', true);

// Create Driver with our Firefox 47+ Config and Launch
var driver = new webdriver.Builder().withCapabilities(capabilities).build();


driver.get('https://lufinesse01.phones.liberty.edu/');

driver.wait(until.elementLocated(By.name('j_username')));

var LoggerBot = logging.getLogger();

LoggerBot.setLevel(logging.Level.FINER);
LoggerBot.addHandler(function(entry){
	console.log("LOGGERBOT: "+entry.message)
});

driver.findElement(By.name('j_username')).sendKeys('jlangford7');
driver.findElement(By.name('j_password')).sendKeys('Langford5379');
driver.findElement(By.name('extension_login_user')).sendKeys('5925379');

driver.findElement({id: 'signin-button'}).click()
// driver.wait(until.elementLocated(By.id('gadgets-gadget-content-2'))).then(function() {
//
// 		while(true){
// 			driver.manage().logs().get(logging.Type.BROWSER).then(function(entries) {
// 					  entries.forEach(function(entry) {
//
// 						if (entry.type == "BROWSER")  {
// 					    		console.log('[%s] %s', entry.level.name, entry.message);
//
// 						} else {
// 							console.log(entry.type);
//
// 						}
// 						driver.sleep(1500);
// 					 });
// 			   })
// 	}
