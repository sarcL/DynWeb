const fs = require('fs');


fs.readFile('got_characters.json', 'utf-8', function (err, jasonStr) {
    if (err) {
        console.log(err.stack);
        throw err;
    }
    const characters = JSON.parse(jasonStr)
    console.log(`Lenght of jasonStr is ${jasonStr.length}`);
    console.log(`Number of characters in GoT? ${characters.length}`);
    console.log(`Name of first character? ${characters[0].name}`);
    console.log(`House of second character? ${characters[1].house}`);
});

