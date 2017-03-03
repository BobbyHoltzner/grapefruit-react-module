var moment = require('moment');

function generateEmptyEvent() {
	let event = {
		eventId: 10,
		artistId: 1,
		type: 6,
		name: 'Test',
		description: 'test',
		streetAddress: 'asdf',
		state: 'asdf',
		city: 'asdc',
		zip: '12345',
		size: 10,
		price: 40.00,
		active: true,
		couponsEnabled: true,
		ticketsSold: 5,
		url: 'https://google.com/',
		notes: 'notes',
		startDateTime: moment(),
		endDateTime: moment(),
		privateParty: false,
		privateCode: 'asdf',
		privateHostCode: 'fdsa',
		artId: 0,
		artSrc: "/assets/images/logo_glass_sm.png"
	}
	return event;
}

let byStudio = [];
for(let i = 0; i < 10; i++){
	byStudio.push(generateEmptyEvent());
}
let pages = 3;
let returnObject = {
	events: byStudio,
	pages
};

module.exports = {
  response: function(ctx){    
    ctx.body = JSON.stringify(returnObject);
  }
};