/* @refresh reload */
import "./plugins";

import { render } from "solid-js/web";
import "./index.css";
import App from "./App";

const root = document.getElementById("root");
render(() => <App />, root!);
