const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

const port = 3000;
const hostname = 'localhost';

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.writeHead('Content-Type', 'text/plain');
    res.end('Hello, Node.js!');
});


// Create a file
fs.writeFile('newfile.txt', 'Hello, this is a new file!', (err) => {
  if (err) {
    console.error('Error creating file:', err);
  } else {
    console.log('File created successfully!');
  }

  myEmitter.on('event', () => {
    console.log('A file has been created.');
    });

    myEmitter.emit('event');

});


// Read a file asynchronously
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
  } else {
    console.log('File content:', data);
  }

  myEmitter.on('event', () => {
    console.log('A file has been read.');
  });

  myEmitter.emit('event');
});


// Update or append a File
fs.appendFile('example.txt', '\Updated file.', (err) => {
  if (err) {
      console.error('Error updating file:', err);
  } else {
      console.log('File updated successfully.');
  }

  myEmitter.on('event', () => {
      console.log('A file has been updated.');
  });

  myEmitter.emit('event');
});


// Delete a file
fs.unlink('newfile.txt', (err) => {
  if (err) {
    console.error('Error deleting file:', err);
  } else {
    console.log('File deleted successfully!');
  }

  myEmitter.on('event', () => {
    console.log('A file has been deleted.');
  });

  myEmitter.emit('event');

});


// path module
const fullPath = path.join(__dirname, 'folder', 'file.txt');
console.log('Full path:', fullPath);

const ext = path.extname(fullPath);
console.log('File extension:', ext);


// URL Module
const sampleUrl = 'http://localhost:3000/delete?filename=example.txt';
const parsedUrl = url.parse(sampleUrl, true);
console.log('Parsed URL:', parsedUrl);
console.log('Query Name:', parsedUrl.query.name);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


  