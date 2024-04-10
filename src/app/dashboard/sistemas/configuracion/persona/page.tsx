"use client"
import TableEntidadComponent from "@/src/components/ui/Table/TableEntidad";
import { SocketContext } from "@/src/context/SocketContext";
import React, { useContext, useState } from "react";

export default function Page() {
  const {socket} = useContext(SocketContext);
  const [ticket,setTicket]=useState<any>({})


  const nuevoticket = () => {
    socket?.emit('solicitar-ticket',null,(ticket:any)=>{
      setTicket(ticket)
    });
  };

  return (
    <>
      <TableEntidadComponent />
      <button onClick={nuevoticket}>Ticket</button>
      <h1>{ticket.numero}</h1>
    </>
  );
}
