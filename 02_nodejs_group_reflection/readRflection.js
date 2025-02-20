const fs = require('fs');
const path = require('path');

// Absolute path to the file
const filePath = path.join(__dirname, 'reflection.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log('Contents of reflection.txt:');
  console.log(data);
});
