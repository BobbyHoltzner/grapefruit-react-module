/// <reference path="../moment/index.d.ts" />

type EventType = {
  studioId: string,
  artSrc: string,
  eventId: number,
  name: string,
  size: number,
  ticketsSold: number,
  startDateTime: moment.Moment,
  endDateTime: moment.Moment
}
type EventMap = {[id: string]: EventType};

type RosterRowType = {
    name: string,
    email: string,
    orderId: string,
    signed: boolean
}
type RosterRowsMap = {[id: string]: RosterRowType};

/**
 *  This is a hack to let require, process bypass type check. We do this rather than pulling in all of node.js typings.
 */
declare var require: any;
declare var process: any;