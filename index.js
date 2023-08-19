const express = require('./main/express')

const app = express()

app.get('/', (req, res) => {
    res.writeHead(200)
    res.write('Hello world!\n');
    res.end();
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))