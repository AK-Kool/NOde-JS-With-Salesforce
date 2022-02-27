//var jsforce = require('jsforce');
import fetch from "node-fetch";

// var conn = new jsforce.Connection();
// conn.login('aakakhilesh@yahoo.com.ein', 'Apple@1221Xsux0QjthwnVF8EifmJK7scS', function(err, res) {
//   if (err) { return console.error('Error1 :' + err); }
//   conn.query('SELECT Id, Name FROM Account LIMIT 5', function(err, res) {
//     if (err) { return console.error('Error2 :' + err); }
//     console.log('Response : ' + JSON.stringify(res));
//   });
// });

var url1 = 'https://testcompany-35b-dev-ed.my.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9fe4g9fhX0E5NaxSjfQqMIRnSHZ9Q_Awk1teIJfCaZ0ClSYO_wSpFBosNGT_NkK4tC4i9QsWrWN_sAA1K&client_secret=9E4A88CE6A049FC1B1A390B13EFBC7C75C1ABE37FEDEC0AEA79EB3AA529BF432&username=aakakhilesh@yahoo.com.ein&password=Apple@1221Xsux0QjthwnVF8EifmJK7scS';

var log = console.log;

async function postData(url) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
    //   headers: {  
    //     'Content-Type': 'application/json'
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  postData(url1)
    .then(data => {
      console.log('DATA : ' + JSON.stringify(data)); // JSON data parsed by `data.json()` call
        log('Access Token :' + data.access_token);

        invokeData('https://testcompany-35b-dev-ed.my.salesforce.com/services/apexrest/v1/Account/0015g00000Ocvdn',data.access_token)
        .then(data1 => {
            console.log('API Response : ' + JSON.stringify(data1));
        });    
    });

async function invokeData(url,token)
{
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {  
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
}  

