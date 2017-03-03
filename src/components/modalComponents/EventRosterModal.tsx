import * as React from 'react';
import {Table, Button, Modal, Row, Col, ControlLabel} from 'react-bootstrap'
import { ObjectMap } from '../../util/util';

type Props = {
  event: EventType,
  roster: RosterRowsMap,
  show: boolean,
  onHide: () => void
}
type State = {
}
export class EventRosterModal extends React.Component<Props,State>{
  constructor(props: Props){
    super(props);
    this.state = {
    };
  }
  
  render(){
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} bsSize={"large"}>
        <Modal.Header closeButton>
          <Modal.Title style={{textAlign: "center"}}>Event Roster</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row>
            <Col style={{textAlign: 'center'}} xs={3}>
                <ControlLabel>Event Name:</ControlLabel>
                <p>{this.props.event.name}</p>
            </Col>
            <Col style={{textAlign: 'center'}} xs={3}>
                <ControlLabel>Event Size:</ControlLabel>
                <p>{this.props.event.size}</p>
            </Col>
            <Col style={{textAlign: 'center'}} xs={3}>
                <ControlLabel>Tickets Sold:</ControlLabel>
                <p>{this.props.event.ticketsSold}</p>
            </Col>
            <Col style={{textAlign: 'center'}} xs={3}>
                <ControlLabel># of Attendees:</ControlLabel>
                <p>{Object.keys(this.props.roster).length}</p>
            </Col>
          </Row>


          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Cutomer Name</th>
                <th>Email</th>
                <th>Order ID</th>
                <th>Signed</th>
              </tr>
            </thead>
            <tbody>
              {ObjectMap(this.props.roster, (key: string, row: RosterRowType) => {
                if(row && row !== null){
                  return (
                    <tr key={key}>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.orderId}</td>
                      <td>{row.signed ? "Yes" : "No"}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}