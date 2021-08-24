// cricInfo website se kissi bhi match ke commentry wallle page ke URL milega .. usse humme last ball commentry extract krni hai.

let request = require("request");

// data extract krne ke liye we use "cheerio module" ... 
// cheerio module ko install krne ke liye --> npm i cheerio (terminal pei likhna hai)
let cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/ball-by-ball-commentary"

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
    let elemRepArr = searchTool(".match-comment-wrapper .match-comment-long-text");   // Array ki form main aata hai ... 
    //abb iska length pata krte hai .
    
    // console.log(elemRepArr.length);  // length 22 isiliye aayi kyuki initially 22 balls ka hi data dikhata hai server humme .. 
    //cause data ki very costly. Aur server starting main hi pura data nhi show kr deta hai ... isilye initially sirf 22 balls ka data milega .

    let lastBallCom = searchTool(elemRepArr[0]).text().trim();
    console.log(lastBallCom);

   
 
}