const express = require('./main/express')

const app = express()

app.get('/', (req, res) => {
    res.writeHead(200)
    res.write('Hello world!\n');
    res.end();
});

app.get('/2', (req, res) => {
    res.writeHead(200)
    res.write('Hello world from /2');
    res.end();
});

app.post('/post',(req,res) => {
    res.writeHead(200)
    res.write('Data from post :)');
    res.end();
})

app.listen(3000, () => console.log('App listening on port 3000!'))