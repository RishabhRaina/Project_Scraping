// cricInfo website se kissi bhi match ke commentry wallle page ke URL milega .. usse humme last ball commentry extract krni hai.

let request = require("request");

// data extract krne ke liye we use "cheerio module" ... 
// cheerio module ko install krne ke liye --> npm i cheerio (terminal pei likhna hai)
let cheerio = require("cheerio");
let fs = require("fs");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/full-scorecard"

request(url,cb);

 function cb (error, response, html) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', html); // Print the HTML for the Google homepage.
if(error){
    console.log(error);  // prints the error if one occured
}
else if (response.statusCode == 404){
    console.log("Page Not Found");
}
else{
    // console.log(html);  // Print the HTML for the Google homepage.
    dataExtractor(html);
}

};

function dataExtractor(html){
    // cheerio.load eek search tool ki tarah kaam krta hai jismei hum basically css selectors ka use krte hai
    let searchTool = cheerio.load(html);
    // css selector --> element representation deta hai ke element html code main kaha hai 
    // find krta hai element ko using css selector..

    // yeh searchTool page pei jitne bhi tables hai unki rows get krega ..
    let bowlers = searchTool(".table.bowler tbody tr");

    for(let i = 0; i < bowlers.length; i++){
        
        // find() jo hai vo rows ke columns get krta hai..
        let cols = searchTool(bowlers[i]).find("td");  // yeh rows ko search krega aur columns ko find krega 
        let aElem = searchTool(cols[0]).find("a");   // "a" anchor tag hai bowler ki info waala page..
       // attributes nikalne ke liye function hota hai attr();

       // mtlb agar new page pei jaake data extract krna hai jaise iss case main birthday krege 
       // toh uske liye  link nikal le --> fir fullLink uske baad --> request laga de .
        let link = aElem.attr("href");
        let fullLink = "https://www.espncricinfo.com/" + link;
        // console.log(fullLink);
        request(fullLink, newcb);

        
    }
    

}

function newcb(error, response, html){

    if(error){
        console.log(error);  // prints the error if one occured
    }
    else if (response.statusCode == 404){
        console.log("Page Not Found");
    }
    else{
        // console.log(html);  // Print the HTML for the Google homepage.
        getBirthday(html);
    }
}

function getBirthday(html){
  let searchTool = cheerio.load(html);
  let headingsArr = searchTool(".player-card-description");
  let age = searchTool(headingsArr[2]).text();
  let name = searchTool(headingsArr[0]).text();

  console.log(name + " " + age);
}