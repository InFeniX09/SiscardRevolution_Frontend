"use client";
import TableEntidadComponent from "@/src/components/ui/Table/TableEntidad";
import { SocketContext } from "@/src/context/SocketContext";
import { Button } from "@nextui-org/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState<any>({});

  const nuevoticket = () => {
    socket?.emit("solicitar-ticket", null, (ticket: any) => {
      setTicket(ticket);
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    console.log("hola");
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full overflow-hidden"
      >
        <Button color="primary" type="submit">
          Sign in
        </Button>
      </form>
      <TableEntidadComponent />
      <button onClick={nuevoticket}>Ticket</button>
      <h1>{ticket.numero}</h1>
    </>
  );
}
