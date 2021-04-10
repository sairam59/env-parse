/**
 * With Release Pipeline
 * Sources:
 * Input - input.txt contains the text that needs to be parsed and generate useful .env file/local.settings.json
 * Output- output.txt contains the generated o/p 
 */

const fs = require("fs");

// Reading the input file synchronously
const fileData = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

/**
 * Put the vars here to exclude
 * EX: AGENT_DISABLELOGPLUGIN_TESTRESULTLOGPLUGIN, BUILD_SOURCEVERSION, PARAMETERS_DOCKERNAMESPACE,
 * RELEASE_ATTEMPTNUMBER, SYSTEM
 */
const excludeVars = ["agent", "build", "parameters", "release", "system"];

// Delimiter - to split

const DELIMITER = "] --> [";
// splitting the file data into an array to parse it
const lineDataArr = fileData.split('\r\n');

// reading cmd line to choose either json or env format
const args = process.argv.slice(2);

// Core logic to filter and extract required keys and values
const refinedArr = lineDataArr.map(line => {
    if (!!line) {
        const trimmedLine = line.trim();
        const splitLine = trimmedLine.split(DELIMITER);
        const key = splitLine[0].slice(1);
        if (excludeVars.some(exclude => key.toLocaleLowerCase().startsWith(exclude))) {
            return;
        }
        const value = splitLine[1].slice(0, -1);

        if (args[0] === 'json') {
            return { [key]: value };
        }
        return `${key}=${value}`;
    }
}).filter(ele => !!ele);

// writing data to output.txt file
if (args[0] === 'json') {

    const mergedData = Object.assign(...refinedArr);
    const jsonData = {
        IsEncrypted: false,
        Values: mergedData,
        Host: {
            LocalHttpPort: 7639
        }
    };
    fs.writeFileSync("output.txt", JSON.stringify(jsonData, null, 2), { flag: 'w' });
} else {
    fs.writeFileSync("output.txt", refinedArr.join("\n"), { flag: 'w' });
}


