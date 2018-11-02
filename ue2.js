const http = require('http');
const url = require('url');
const hbs = require('handlebars');
const fs = require('fs');
const characters = {characters: []};
var nameChosen;
const einName = 'Addam_Frey';

fs.readFile('got_characters.json', 'utf-8', function (err, jasonStr) {
    if (err) {
        console.log(err.stack);
        throw err;
    }
    characters.characters = JSON.parse(jasonStr);

    const start = {start: [{title: 'Welcome to the GoT Character Service'}]};

    const htmlTemplateCharacters = `
<html>
<head></head>
<body>
    <ul style="list-style-type:none">
    {{#each characters}}
        <li><b><a href="http://localhost:3000/characters/{{this.slug}}">{{this.name}}</a></b></li>
        <li>{{this.house}}</li>
        {{#if this.titles}}
            <li>Title: {{this.titles}}</li>
        {{/if}}
        <br>
    {{/each}}
    </ul>
    {{> footer}}
</body>
</html>`;

    const htmlTemplateStart = `
<html>
<head></head>
<body>
    {{#start}}
        <h1>{{this.title}}</h1>
    {{/start}}
    <p>Please click the following Link to see all characters.</p>
    <a href="http://localhost:3000/characters">List of Characters</a>
    {{> footer}}
</body>
</html>`;

    const htmlTemplateCharacterDetails = `
<html>
<head></head>
<body>
    <ul style="list-style-type:none">
    {{#lookup characters nameChosen}}
        <li><b>{{this.name}}</b></li>
        <li>{{this.house}}</li>
        {{#if this.titles}}
            <li>Title: {{this.titles}}</li>
        {{/if}}
        <br>
    {{/each}}
    </ul>
    {{> footer}}
</body>
</html>`;

    hbs.registerPartial('footer',
        '<footer>GoT Search Service, Copyright 2018</footer>');

    const compiledHtmlTemplate1 = hbs.compile(htmlTemplateCharacters);
    const compiledHtmlTemplate2 = hbs.compile(htmlTemplateStart);
    const compiledHtmlTemplate3 = hbs.compile(htmlTemplateCharacterDetails);

    const server = http.createServer(function (req, res) {
        const urlObj = url.parse(req.url, true);

        if (urlObj.pathname === '/') {
            res.write(
                compiledHtmlTemplate2(start)
            );
            res.end();
        } else if (urlObj.pathname === '/characters') {
            res.write(
                compiledHtmlTemplate1(characters)
            );

            res.end();
        } else if (urlObj.pathname === '/characters/${{einName}}') {
            res.write(
                compiledHtmlTemplate3(characters)
            );
            res.end();
        }else {
            res.statusCode = 404;
            res.write('404 Not Found');
            res.end();
        }


    });

    server.listen(3000);
    //console.log(characters.characters[0].name);

});


