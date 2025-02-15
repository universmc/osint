const fs = require('fs');
const commander = require('commander');

// Define command line options
const command = commander
    .version('1.0.0')
    .description('Select a subject and display metadata from an external file')
    .arguments('<subject>')
    .action(command => {
        const subject = command.subject;
        const themes = JSON.parse(fs.readFileSync('themes.json'));

        // Check if the subject exists
        if (!themes.hasOwnProperty(subject)) {
            console.error(`Subject "${subject}" not found in the list.`);
            return;
        }

        const theme = themes[subject];
        console.log(`Theme: ${subject}`);
        console.log('Metadata:');
        console.log(JSON.stringify(theme, null, 2));
    });

command.parse();