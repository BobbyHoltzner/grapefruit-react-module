import * as React from 'react';
import {DropdownButton, MenuItem, Grid, Row, Col, ControlLabel, Pagination} from 'react-bootstrap';
import {gfAjaxAction} from './util/ajax';
import {ObjectToArray, sortEventsByDateDESC} from './util/util';
import { Event } from './components/Event';
import { EventRosterModal } from './components/modalComponents/EventRosterModal';
import * as GFSwal from './util/swal';

type State = {
  loaded?: boolean,
  studioNameLookup?: {[id: string]: string},
  selectedStudioName?: string,
  selectedStudioID?: string,
  showStudioSelect?: boolean,
  events?: EventType[],
  selectedRoster?: RosterRowsMap,
  showEventRoster?: boolean,
  pages?: number,
  currentPage?: number,
  selectedRosterId?: number
};


export class EventRoster extends React.Component<{}, State>{
  constructor(){
    super();
    this.state = {
      loaded: false,
      studioNameLookup: null,
      selectedStudioName: "All Studios",
      selectedStudioID: '0',
      showStudioSelect: false,
      events: [],
      showEventRoster: false,
      selectedRoster: null,
      pages: 0,
      currentPage: 0,
      selectedRosterId: 0
    };
    this.ajaxFetchShowStudioSelect();
    this.ajaxFetchStudioNames();
    this.ajaxFetchStudioEvents(this.state.currentPage);
  }
  ajaxFetchShowStudioSelect = async () => {
    let showStudioSelect = await gfAjaxAction('showStudioSelect', {}, null);
    this.setState({showStudioSelect});
  }
  ajaxFetchStudioNames = async () => {
    let studioNameLookup = await gfAjaxAction('loadStudioNames', {}, null);
    this.setState({studioNameLookup});
  }
  ajaxFetchStudioEvents =  async (page: number) => {
    let eventReturn = await gfAjaxAction('loadStudioEvents', {selectedStudioId: this.state.selectedStudioID, page: page}, null);
    let events = ObjectToArray(eventReturn.events);
    let sortedEvents = sortEventsByDateDESC(events);
    this.setState({
      loaded: true,
      events: sortedEvents,
      pages: eventReturn.pages
    });
  }
  ajaxFetchEventRoster = async (eventId: number) => {
    GFSwal.gfLoadingSwal("Loading roster...");
    let selectedRoster = await gfAjaxAction('loadEventRoster', {eventId: eventId}, null);  
    GFSwal.close();  
    this.setState({
      selectedRosterId: eventId,
      selectedRoster, 
      showEventRoster: true
    });
  }
  
  handleStudioSelect = (selectedStudio: string) => {
    let studioName = this.state.studioNameLookup[selectedStudio];
    if(selectedStudio === "0"){
      studioName = "All Studios";
    }
    this.setState({
      loaded: false,
      selectedStudioName: studioName,
      selectedStudioID: selectedStudio,
    }, () => this.ajaxFetchStudioEvents(0));
  }

  handlePageChange = (newPage: number) => {
    this.setState({loaded: false, currentPage: newPage});
    this.ajaxFetchStudioEvents(newPage);
  }

  getEventById = (id: number) => {
    return this.state.events.find((event: EventType) => event.eventId === id);
  }
  
  render(){
    let studioNames: JSX.Element[] = [];
    for (let key in this.state.studioNameLookup) {
      let item = this.state.studioNameLookup[key];
      studioNames.push(
        <MenuItem className={"presentation"} key={key} eventKey={key}>{item}</MenuItem>
      )
    }

    let loadingRosters: string = "Loading...";
    if(this.state.loaded === true){
      loadingRosters = "No rosters available.";
    }
    return (
      <Grid fluid>

        {this.state.showStudioSelect &&
          <Row style={{alignContent: "left", marginBottom: 25}}>
            <Col xs={12}>
              <ControlLabel style={{marginRight: 25}}>Filter by Studio:</ControlLabel>
              <DropdownButton className="scrollable-menu" title={this.state.selectedStudioName} id="bg-nested-dropdown" onSelect={(selectedStudio: any) => this.handleStudioSelect(selectedStudio)}>                
                <MenuItem eventKey="0">All Studios</MenuItem>
                <MenuItem divider />
                {studioNames}
              </DropdownButton>

            </Col>
          </Row>
        }

        
        {this.state.events.map((event: EventType, index: any) => {
          if(event && event !== null){
            return (
              <Event 
                key={index}
                isCorporate={this.state.showStudioSelect}
                eventId={event.eventId}
                event={event}
                onEventSelect={this.ajaxFetchEventRoster}
                studioName={this.state.studioNameLookup[event.studioId]}
              />
            );
          }
        })}

        {this.state.events.length > 0 ?
            <div style={{textAlign: 'center', margin: '0 auto'}}>
              <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                items={this.state.pages}
                maxButtons={5}
                activePage={this.state.currentPage}
                onSelect={(newPage: any) => {this.handlePageChange(newPage)}} />
            </div>  
            :
            <h3 style={{textAlign: 'center'}}>{loadingRosters}</h3>
        }


        { this.state.showEventRoster ?
          <EventRosterModal
            event={this.getEventById(this.state.selectedRosterId)}
            roster={this.state.selectedRoster}
            show={this.state.showEventRoster}
            onHide={() => this.setState({showEventRoster: false, selectedRosterId: 0})}
          />
          : <div/>
        }

      </Grid>
    );
  }
}