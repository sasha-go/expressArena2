const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
	res.send('Hello Express! :) ');
})

app.get('/burgers', (req, res) => {
	res.send('We have juicy cheese burgers');
});

app.get('/pizza/pepperoni', (req, res) => {
	res.send('Your pizza is on the way');
})

app.get('/pizza/pineapple', (req, res) => {
	res.send('We don\'t serve that here. Never call again!');
})

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
		Path: ${req.path}
  `;
  res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
	console.log(req.query);
	res.end();
})

app.get('/greetings', (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if(!name) {
    //3. name was not provided
    return res.status(400).send('Please provide a name');
  }

  if(!race) {
    //3. race was not provided
    return res.status(400).send('Please provide a race');
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom!!`;

  //6. send the response 
  res.send(greeting);
});




//EXPRESS DRILLS 

// SUM ROUTER
// Create a route handler function on the path /sum that accepts two query parameters named a and b and find the sum of the two values. Return a string in the format "The sum of a and b is c". Note that query parameters are always strings so some thought should be given to converting them to numbers.
app.get('/sum', (req, res) => {
	
	const a = req.query.a;
	const b = req.query.b;

	if(!a) {
		return res
			.status(400)
			.send('a is required')
	}

	if(!b) {
		return res
			.status(400)
			.send('b is required')
	}

	const numA = parseFloat(a);
	const numB = parseFloat(b);

	if(Number.isNaN(numA)) {
		return res
			.status(400)
			.send('a must be a number')
	}

	if(Number.isNaN(numB)) {
		return res
			.status(400)
			.send('b must be a number')
	}

	const sum = parseInt(numA + numB);

	const sumRes = `The sum of a and b is ${sum}`;

	res
		.status(200)
		.send(sumRes);

})




// CIPHER

// ARRAY

app.listen(8000, () => {
	console.log('Express server is listening on port 8000!');
});

