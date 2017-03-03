import * as React from 'react';
import {Grid, Col, Row, Image, ControlLabel, FormGroup, HelpBlock, Panel} from 'react-bootstrap'
const moment = require("moment");


type Props = {
    eventId: number,
    event: EventType,
    onEventSelect: (eventId: number) => void,
    isCorporate: boolean,
    studioName: string
}
type State = {
}
export class Event extends React.Component<Props,State>{
  constructor(props: Props){
    super(props);
    this.state = {
    };
  }

  
  render(){

    return (
      <Panel onClick={() => this.props.onEventSelect(this.props.eventId)} style={{borderWidth: "medium", textAlign: "center"}} bsStyle="warning">
        <Grid fluid>
          <Row>
            {/* Name and Image */}
            <Col xs={12} md={3}>
              <form>
                  <FormGroup>
                      {this.props.isCorporate ?
                        <Row>
                            <ControlLabel >Studio:</ControlLabel>
                            <p>{this.props.studioName}</p>
                        </Row>
                        :
                        <Row>
                            <ControlLabel >Name:</ControlLabel>
                            <p>{this.props.event.name}</p>
                        </Row>
                      }

                      <HelpBlock />
                      <Row>                    
                        <Image src={this.props.event.artSrc ? this.props.event.artSrc : '/assets/images/logo_glass_sm.png'} thumbnail />
                      </Row>
                  </FormGroup>
              </form>
            </Col>

            {/* Date */}
            <Col xs={3}>
              <form>
                <FormGroup>
                      {this.props.isCorporate ?
                        <Row>
                            <ControlLabel >Name:</ControlLabel>
                            <p>{this.props.event.name}</p>
                        </Row>
                        :
                        <div/>
                      }
                    <ControlLabel>Date:</ControlLabel>
                    <p>{moment(this.props.event.startDateTime).format('MM-DD-YYYY')}</p>                  
                </FormGroup>
              </form>
            </Col>

            {/* Time */}
            <Col xs={3}>
              <form>
                <FormGroup>
                    <ControlLabel>Start Time:</ControlLabel>
                    <p>{moment(this.props.event.startDateTime).format('hh:mm A')}</p>     
                    <ControlLabel>End Time:</ControlLabel>
                    <p>{moment(this.props.event.endDateTime).format('hh:mm A')}</p>                 
                </FormGroup>
              </form>
            </Col>

            {/* # of Attendees */}
            <Col xs={3}>
              <form>
                <FormGroup>
                    <ControlLabel>Tickets Sold/EventSize:</ControlLabel>
                    <p>{this.props.event.ticketsSold} / {this.props.event.size}</p>                  
                </FormGroup>
              </form>
            </Col>
          </Row>
        </Grid>
      </Panel>
    );
  }
}