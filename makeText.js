/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function createText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(path) {
    fs.readFile(path, "utf8", function callback(err, data) {
        if (err) {
            console.log('ERROR:', err)
            process.exit(1);
        } else {
            createText(data);
        }
    });
    }

async function URLText(url) {
    let res;

    try{
        res = await axios.get(url);
    } catch(err) {
        console.log('ERRROR', err)
        process.exit(1);
    }
    createText(res.data)
}

let[method, path] = process.argv.slice(2);

if(method === "file") {
    makeText(path);
}

else if (method === "url") {
    URLText(path);
}

else {
    console.log(`unknown method: ${method}`)
    process.exit(1);
}