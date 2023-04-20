// Translate Words Challenge 
// imports ........................................................................

const fs = require('fs'); // nodejs inbuilt file system module for handling files
const csv = require('csv-parser'); // csv-parser library for parsing csv file sothat javascript object
// can be created later on

// initialization ..................................................................

const inputFilePath = 't8.shakespeare.txt';
const findWordsFilePath = 'find_words.txt';
const dictionaryFilePath = 'french_dictionary.csv';
const outputFilePath = 't8.shakespeare.translated.txt';  // output file 
const frequencyFilePath = 'frequency.csv';
const dictionaryMapping = {};  // initializing empty dictionary by using object literal
const replacedWords = {};      // initializing empty object by using object literal to keep track of replacedWords and their frequency as a value 
const startTime = process.hrtime();   // this line will start a timer to track the execution time // using hrtime() method
let matchingWord;
let count=0;
let outputText;  



// processing ...........................................................................
// Step 1: Reading input and findWord files in synchronous manner

const inputText = fs.readFileSync(inputFilePath, 'utf-8');
outputText = inputText;
const findWordsText = fs.readFileSync(findWordsFilePath, 'utf-8');

// Step 2: Parsing french_dictionary.csv file........................................................

dictionaryMapping.abide = 'respecter'    // adding explicitly the first column
fs.createReadStream(dictionaryFilePath)
  .pipe(csv())  //  pipe method pipes the stream to the csv() method.
  .on('data', (row) => {  // on method is used to listen for the 'data' event, which is emitted for each row in the CSV file
    dictionaryMapping[row.abide] = row.respecter; // reading dictionary data in chunks and mapping it into dictionaryMapping
  })
  .on('end', () => {     // on method is used to listen for the 'end' event, which is emitted when the stream has been fully read.   
    
    // Step 3: Replacing words by using this pattern.......................................................
    // using new RegExp() constructor here
    const pattern = new RegExp('\\b(' + findWordsText.trim().split('\n').join('|') + ')\\b', 'g');
  
    while ((matchingWord = pattern.exec(inputText)) !== null) {  
      //while loop to find all matches in the input text.

      const [matchedWord, wordIndex] = matchingWord;
      const replacedWord = returnReplacedWord(matchedWord, dictionaryMapping); // invoking callback function
      if (replacedWord) {
        count++
        replacedWords[replacedWord] = (replacedWords[replacedWord] || 0) + 1;  // keeping track of replaced word and their frequency
        outputText = outputText.slice(0, wordIndex) + replacedWord + outputText.slice(wordIndex + matchedWord.length);
        // Move the pattern index lastIndex property of the pattern object is updated to move to the next word to avoid infinite loop.
        pattern.lastIndex += replacedWord.length - matchedWord.length;
      }
    }
    
    
    //console.log(dictionaryMapping)  // we can check dictionary mapping here and use it to replace words
    
    // Step 4: Write output file in synchronous manner...................................................................
    fs.writeFileSync(outputFilePath, outputText);

    // Step 5: Writing the frequency.csv file by using fs module's writeFileSync function
    // using higher order function map and find methods
    const frequencyText = Object.entries(replacedWords).map(([word, count]) => {
      const englishWord = Object.keys(dictionaryMapping).find(key => dictionaryMapping[key] === word);
      return `${englishWord},${word},${count}`;
    }).join('\n');  // \n escape sequence character
    // writing frequency.csv file synchronously in this pattern
    fs.writeFileSync(frequencyFilePath, `englishWord,frenchWord,frequencyCount\n${frequencyText}`);

    // Step 6: Printing Output results using console.log ...........................................................
    const endTime = process.hrtime(startTime);  // 
    console.log(`Replaced words: ${JSON.stringify(replacedWords, null, 2)}`);  // prints the unique list of words and their replaceCount
    console.log(`Replace Count: ${count}`)
    console.log(`Time taken: ${endTime[0]}s ${endTime[1] / 1000000}ms`);  // prints the total time taken by the whole process // TC
    console.log(`Memory used:`);
    console.log(process.memoryUsage())   // prints an object of used memory // SC

  });


// Returns the correctly-cased French equivalent of the given English word 
// writing a callback function

function returnReplacedWord(matchedWord, dictionaryMapping) {
  const lowerCasedWord = matchedWord.toLowerCase();
  const replacedWord = dictionaryMapping[lowerCasedWord];
  if (replacedWord) {
    // Preserve the original casing of the matchingWorded word

    const firstChar = matchedWord.charAt(0);
    if (firstChar === firstChar.toUpperCase()) {
      return replacedWord.charAt(0).toUpperCase() + replacedWord.slice(1); 
    } else {
      //console.log(replacedWord)  // prints the replacedWord
      return replacedWord;    
    }
  } else {
    return null;  // otherwise return null
  }
}
