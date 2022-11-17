/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};
    let words = this.words;
    words.forEach(function(val, index) {
      if (chains[words[index]]) {
        chains[val].push(words[index+1])
      }
      else {
        chains[val] = [words[index+1]]
      }
      if (words[index+1] === undefined) {
        chains[val] = [null] 
      }
    })
  return chains
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let newText = '';
    let wordCount = 0;
    let chains = this.chains;
    let keys = Object.keys(chains);
    

    while (wordCount < numWords) {

      // get a random key from chains
      let currKey = keys[Math.floor(Math.random() * keys.length)]
      while (currKey !== null){ 
        
        // randomly choose a word from the key's values
        let nextKey = chains[currKey][Math.floor(Math.random() * chains[currKey].length)]
       
        // if the key has no values (null), start over
        if (nextKey === null) {
          currKey = null;
        }
        // else, add word to text
        else {
          newText += nextKey + ' '
          currKey = nextKey
        }
        wordCount += 1
      }
    }
   return newText
  }
}

module.exports = { MarkovMachine }

