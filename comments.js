// Create web server

// Import modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Import JSON file
const comments = require('./comments.json');

// Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Create routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Comments',
        comments: comments
    });
});

app.post('/add', (req, res) => {
    const newComment = {
        name: req.body.name,
        comment: req.body.comment,
        date: new Date()
    }
    comments.unshift(newComment);
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) throw err;
        console.log('File saved');
    });
    res.redirect('/');
});

// Set port
const port = 3000;
// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});