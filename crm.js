var dn = require("dynamicsnode");

var crm = new dn.CRMClient("Url=https://crm.liberty.edu/LibertyUniversity/; Domain=SENSENET; Username=jlangford7; Password=Joshua98"); // update this with your CRM url and credentials if needed

// // retrieve the current user
var who = crm.whoAmI();
var myUser = crm.retrieve("contact" , who);
// var userSearch = crm.retrieveMultiple("contact", {new_libertyid:"L25599990"});
// var anotherUser = crm.retrieve("account",{fullname:"John Doe"});
// console.log(userSearch);
console.log(who);
// userSearch.rows[0].emailaddress1, userSearch.rows[0].new_libertyid, userSearch.rows[0].emailaddress3
// retrieve a user named John Doe
// console.log(anotherUser);
//
// crm.retrieve("AP - Application", {id:'d588b4d6-d57a-de11-beec-005056885cd9'});
//
// if (userSearch) {
//      console.log(userSearch);
//
// } else {
//      console.log("Error.");

// }
