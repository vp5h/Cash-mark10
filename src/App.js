import "./styles.css";
import React, { useState } from "react";

let all = {
  1: "",
  2: "",
  5: "",
  10: "",
  20: "",
  50: "",
  100: "",
  500: "",
  2000: ""
};
let cash = "";
let amt = "";

export default function App() {
  // var [amt, SetAmt]= useState("")
  // var [cash, SetCash]= useState("")
  const [error, SetError] = useState("");

  const [deno, SetDeno] = useState(all);
  const arr = Object.keys(deno).sort(function (a, b) {
    return b - a;
  });
  function changeHandlerAmt(event) {
    // SetAmt(amt)
    amt = Number(event.target.value);
    // SetAmt(amt);
    console.log(amt);
  }
  function changeHandlerCash(event) {
    cash = Number(event.target.value);
    // SetCash(cash);

    console.log(cash);
  }

  function Output() {
    if (error === "") {
      return (
        <div id="output">
          <table>
            <tbody>
              <tr>
                <th>No of Notes</th>

                {arr.map((note, index) => (
                  <td className="noOfNotes" key={note}>
                    {deno[note]}{" "}
                  </td>
                ))}
              </tr>
              <tr>
                <th>Notes</th>
                {arr.map((note) => (
                  <td key={note}>{note}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return <h2>Something Went wrong</h2>;
    }
  }

  function denoCalac() {
    let diffr = cash - amt;
    if (diffr < 0) {
      SetError("Cant Process");
    } else {
      SetError("");
      arr.forEach((note) => {
        let noteNo = Number(note);
        if (diffr >= noteNo) {
          let count = Math.floor(diffr / noteNo);
          diffr = diffr - noteNo * count;
          all[noteNo] = count;
        } else {
          all[noteNo] = "0";
        }
      });

      SetDeno({ ...all });
      //Spread op bascially provides the copy of array
      console.log(all);
      // console.log(deno)

      // console.log(diffr);
      // return all;
      // console.log(amt)
      // console.log(cash)
      // console.log(refund)
    }
  }

  return (
    <div className="App">
      <header className="hero">
        <h1 className="hero-heading">Cash Register Manager</h1>
      </header>
      <section className="section">
        <div className="container container-center section-center">
          <p style={{ textAlign: "center", padding: "0rem 1rem" }}>
            Enter the bill amount and cash given by the customer and know
            minimum number of notes to return.
          </p>

          <input
            type="Number"
            placeholder="amount"
            onChange={changeHandlerAmt}
          ></input>
          <input
            type="Number"
            placeholder="cash"
            onChange={changeHandlerCash}
          ></input>
          <button onClick={denoCalac}>Get Amount</button>

          <h2>Denominations</h2>
          <h3>{error}</h3>
          <ul>
            {
              <div>
                {/* <p>{JSON.stringify(deno)}</p> */}
                <Output />
              </div>
            }
          </ul>
        </div>
      </section>
    </div>
  );
}
