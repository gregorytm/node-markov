/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let text = new Map();
    for(let i =0; i < this.words.length; i++){
      let currWord = this.words[i];
      let nextWord = this.words[i+1] || null;

      if (text.has(currWord)) text.get(currWord).push(nextWord);
      else text.set(currWord, [nextWord]);
    }
    this.text = text;
  }

//wtf, taken from solutions
static choice(ar) {
  return ar[Math.floor(Math.random() * ar.length)];
}


  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.text.keys());
    let key = MarkovMachine.choice(keys);
    let out=[]

    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.text.get(key))
    }
    return out.join(" ");
  }
}

let mm = new MarkovMachine("the cat in the hat");

// mm.makeText();
// console.log(mm)

// mm.makeText(numWords=50);
// console.log(mm)

module.exports = {
  MarkovMachine
};
