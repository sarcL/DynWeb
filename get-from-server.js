const http = require('http');

const server = http.createServer(function (req, res) {
    res.write(
        `<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    <form action="/characters" method="get">
        <input type="text" name="characterName"/>
        <button type="submit">Suche jetzt!</button>
    </form>
</body>
</html>`
    );
    res.end();
});

server.listen(3000);
