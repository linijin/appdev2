const EventEmitter = require('events');
const emitter = new EventEmitter();

//Listener 1
emitter.on("start", () => {
  console.log("Application Started!");
})

//Listener 2
emitter.on("data", (name,age) => {
  console.log(`Data received: ${name}, ${age}`)
})

const dynamicdata = {name: "John Doe", age: 25}

//Error Handling Listener
emitter.on("error", (err) => {
  console.log(`Error Occured: ${err}`)
})

emitter.emit('start');
emitter.emit('data', dynamicdata.name, dynamicdata.age);
emitter.emit('error', "Something went wrong!")




