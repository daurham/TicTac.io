import React, { useEffect, useState } from "react";
import { useData } from "../Context";
// import openSocket from 'socket.io-client';
import Board from "./Board";

export default function App() {
  // const {boardData, playerValue} = useData();
  // console.log('board logic here: ', boardData);
  // Test for winner.
  return (
    <div>
      <h1>TicTac.io</h1>
      {/* <h6>{data}</h6> */}
      <Board />
    </div>
  );
};