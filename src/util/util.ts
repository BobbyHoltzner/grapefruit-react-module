const moment = require("moment");

export function generateEmptyEvent(): EventType {
	let event: EventType = {
		studioId: '0',
		eventId: 0,
		name: '',
		size: 0,
		ticketsSold: 0,
		startDateTime: moment(),
		endDateTime: moment(),
		artSrc: "/assets/images/logo_glass_sm.png"
	}
	return event;
}

export let EventTypes: {[id: string]: string} = {
	3: 'Art Buzz Kids',
	4: 'Paint It Forward',
	5: 'Design On Wheels',
	6: 'Design In Studio',
	7: 'Team Building',
	8: 'Art Buzz Kids Camps'
};

export function eventTypeLookup(id: number): string {
	return EventTypes[id.toString()];
}

export function ObjectMap(obj: any, fn: (key: string, value: any) => any){
	let array: any[] = [];
	for (let k in obj) {
		if (obj.hasOwnProperty(k)){
			array.push(fn(k, obj[k]));
		}
	}
	return array;
}

export function ObjectToArray(obj: any) {
	let arr: any[] = [];
	for(let property in obj) {
		arr.push(obj[property]);
	}
	return arr;
}

export function sortEventsByDateDESC(events: EventType[]) {
	return events.sort(function(a: EventType, b: EventType) { return new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime() } );
}