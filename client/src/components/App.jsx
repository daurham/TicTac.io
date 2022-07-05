import React, { useEffect, useState } from "react";
import { useData } from "../Context";
import openSocket from 'socket.io-client';
import Board from "./Board";

export default function App() {
  const data = useData();
  
  openSocket('http://localhost:3000');

  return (
    <div>
      <h1>TicTac.io</h1>
      <h6>{data.textData.text}</h6>
      <Board />
    </div>
  );
};