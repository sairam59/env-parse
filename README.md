### HOW TO USE

## input.txt
    Copy the JSON from AZURE CLI o/p., after running the below cmd and paste it in ##input.txt## file.
    az functionapp config appsettings list --resource-group <RESOURCE-GROUP-NAME> --name <FUNCTION-NAME>

## output.txt
    Can grab the output either in JSON/ENV format for respective cmds below.

## CMDS
 # FOR JSON Format
    node index.js json
 # FOR ENV Format (by default)
    node index.js | node index.js env
