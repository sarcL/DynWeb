const hbs = require('handlebars');

const simpleTemplate = 'My name is {{firstName}}';
const data = {
  firstName: 'Lejla'
};

const compiledSimpleTemplate = hbs.compile(simpleTemplate);
const result = compiledSimpleTemplate(data);
console.log(result);

const characters = {
    characters: [{name: 'Hodor', house: 'Stark'}, {name: 'Arya', house: 'Stark'}, {name: 'Jon', house: 'Stark'}, {name: 'Sansa', house: 'Stark'}]
};

hbs.registerPartial('footer',
    '<footer>GoT Search Service, Copyright 2018</footer>');

const htmlTemplate = `
<html>
<head></head>
<body>
    <ol>
    {{#each characters}}
        <li>Name: {{this.name}}</li>
        <li>House: {{this.house}}</li>
    {{/each}}
    </ol>
    {{> footer}}
</body>
</html>`;

const compiledHtmlTemplate = hbs.compile(htmlTemplate);
console.log(compiledHtmlTemplate(characters));
console.log(characters);
