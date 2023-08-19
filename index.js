const express = require('./main/express')

const app = express()

const logger = (req, res, next) => {
    console.log(req.headers['user-agent']);
    next();
}

app.get("/", logger)

app.get('/', (req, res) => {
    res.writeHead(200)
    res.write('Hello world from write\n');
    res.send('Hello world');
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