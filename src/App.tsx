/// <reference path="../typings/index.d.ts" />
import * as React from "react";
import {render} from "react-dom";
import {EventRoster} from "./event-roster";

const App = () => (<EventRoster />);

render(<App />, document.getElementById("root"));