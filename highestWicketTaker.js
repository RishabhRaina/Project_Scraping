// cricInfo website se kissi bhi match ke commentry wallle page ke URL milega .. usse humme last ball commentry extract krni hai.

let request = require("request");

// data extract krne ke liye we use "cheerio module" ... 
// cheerio module ko install krne ke liye --> npm i cheerio (terminal pei likhna hai)
let cheerio = require("cheerio");
let fs = require("fs");
const { nextAll } = require("cheerio/lib/api/traversing");

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

    // 1st way of doing .. ke tum jitna part chahiye uska selector pass krke ekk html file bana do taki usse search krna easy hojaye
    // let htmlData = "";
    // for(let i = 0; i< bowlers.length; i++){
    //     // .html function --> kya krta hai ki jo small portion hai bde caode ka uska html de deta hai. String ki form main deta hai 
    //     htmlData += searchTool(bowlers[i]).html();

    // } 
    // fs.writeFileSync("table.html", htmlData);

    // 2nd way 
    // loop maarege 
    // name nikalege
    // wicket nikalege
    // compare krke highestWicTa.. find krege
    let bowler = "";  
    let hwt = 0;
    for(let i = 0; i < bowlers.length; i++){
        // find() jo hai vo rows ke columns get krta hai..
        let cols = searchTool(bowlers[i]).find("td");  // yeh rows ko search krega aur columns ko find krega 
        let name = searchTool(cols[0]).text();
        let wickets = searchTool(cols[4]).text();
        console.log(name + ":" + wickets);
        if(wickets>= hwt){
            bowler = name;
            hwt = wickets;
        }
       
    }
     // highest wicket 
     console.log("*************************");
    console.log(bowler + ":" + hwt);

   

    

   
 
}