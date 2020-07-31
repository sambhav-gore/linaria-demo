import { styled } from "linaria/react";
import { css } from "linaria";
import { math } from "polished";
import React from "react";
import ReactDOM from "react-dom";
import { variables } from "stylevars-test";

// local variable
const fontSize = "72px";

// variable from a lib
const { titlePadding } = variables;
console.log(`Padding for the title is - ${titlePadding}`);

const styles = css`
  :global() {
    .title {
      font-family: sans-serif;
      font-size: ${fontSize};
      color: tomato;
      padding: ${titlePadding};
    }
  }
`;

const App = () => <div className="title">Hello world!</div>;

ReactDOM.render(<App />, document.getElementById("root"));
