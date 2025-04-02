const fs = require('fs');

// Read a file asynchronously
fs.readFile('sample.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("The File doesn't exist ", err);
  } else {
    console.log('File content:', data);
  }
});


// Create a file
fs.writeFile('newfile.txt', 'This is a new file created by Node.js!', (err) => {
  if (err) {
    console.error('Error creating file:', err);
  } else {
    console.log('File created and data written successfully!');
  }
});

// Append data to an existing file
fs.appendFile('sample.txt', '\nAppended content', (err) => {
    if (err) {
      console.error('Error appending to file:', err);
    } else {
      console.log('Data appended successfully!');
    }
  });
  
// Delete a file
fs.unlink('newfile.txt', (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      console.log('File deleted successfully!');
    }
  });
  

