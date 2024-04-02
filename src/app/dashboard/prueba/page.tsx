'use client'
import React, { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io('http://localhost:8080')

export default function page() {

  return (
    <>
      <div>page</div>
    </>
  );
}
