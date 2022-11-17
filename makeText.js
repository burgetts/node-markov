/** Command-line tool to generate Markov text. */

/* Import requirements */
const fs = require('fs');
const process = require('process');
const axios = require('axios');
const MarkovMachine = require('./markov.js')
let text;

/* Get arguments from command line */
const sourceType = process.argv[2]
const source = process.argv[3]

/* Gets a Markov Chain from inputted data*/
function makeModel(data) {
    let mm = new MarkovMachine.MarkovMachine(data)
    let finalText = mm.makeText()
    return finalText
}

/* Extracts text from file or url specified in command line */
async function getText() {
    
    if (sourceType === 'file') {
       fs.readFile(source, 'utf8', function(err, data) {
            if (err) {
                console.error(err)
                process.exit(1)
            }
            let finalText = makeModel(data)
            console.log(finalText)
        })
    }

    else if (sourceType === 'url') {
        try {
            let resp = await axios.get(source);
            let finalText = makeModel(resp.data)
            console.log(finalText)
          } catch (err) {
            console.error(err);
            process.exit(1);
          }
    }
}

getText()

