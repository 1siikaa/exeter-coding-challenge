Translate Words Challenge - Readme

Overview........................................................................
This is a Node.js script that reads a t8.shakespeare.txt text file, finds specific words to translate 
using a CSV file containing English-French word mappings, replaces the English words with their French
equivalents, and writes the translated text to a new processed file. The script also keeps track of the
replaced words and their frequency in a CSV file.

Dependencies......................................................................
``` yaml
This script uses the following dependencies:
fs: Node.js inbuilt file system module for handling files
csv-parser: A library for parsing CSV files so that a JavaScript object can be created later on.

 ```
Installation.........................................................................
To run this script, make sure that you have Node.js installed on your system. 
Clone the repository and install the dependencies using the following command:
``` yaml
npm install <dependency_name>
```


Usage....................................................................................
Place the text file that you want to translate in the project directory and specify its path in the 
inputFilePath constant in the script file translator.js.

Create a file named find_words.txt and add the English words that you want to translate, 
each word on a new line.

Create a CSV file named french_dictionary.csv containing the English-French word mappings.

Run the script using the following command...................................................
```yaml
node translator.js
```

The script will output the following...........................................................
```yaml
Replaced words and their frequency
Replace count
Total time taken by the process
Memory used
```

// output files.................................................................................
```yaml
The translated text will be written to a file named t8.shakespeare.translated.txt 
The frequency of replaced words will be written to a file named frequency.csv.
```