/// <reference path="../typings/index.d.ts" />
import * as React from "react";
import {gfAjaxAction} from './util/ajax';

type Props = {

};

type State = {

};

export class EventRoster extends React.Component<Props, State> {
    componentDidMount() {
        gfAjaxAction('api', {}, () => console.log("AJAX WORKED"));
    }
    render() {
        return (
            <h1>Hello World!</h1>
        );
    }
}