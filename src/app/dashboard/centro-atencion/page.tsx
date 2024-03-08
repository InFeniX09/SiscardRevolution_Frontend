import React from "react";
import classes from "./index.module.css";
import { TicketIcon,ClipboardDocumentCheckIcon,DocumentIcon } from "@heroicons/react/24/solid";

export default function page() {
  return (
    <>
      <div className={classes.div_centroatencion}>
        <div className={classes.Tickets}>
          <div className={classes.Card}>
            <div>
              <TicketIcon className="h-5" />
              <h1>1</h1>
            </div>
            <div>
              <h2>Ticket Nuevos</h2>
              <p>Hoy</p>
            </div>
          </div>
          <div className={classes.Card}>
            <div>
              <TicketIcon className="h-5" />
              <h1>1</h1>
            </div>
            <div>
              <h2>Ticket Pendientes</h2>
              <p>Hoy</p>
            </div>
          </div>
          <div className={classes.Card}>
            <div>
              <TicketIcon className="h-5" />
              <h1>1</h1>
            </div>
            <div>
              <h2>Ticket Cerrados</h2>
              <p>Hoy</p>
            </div>
          </div>
          <div className={classes.Card}>
            <div>
              <ClipboardDocumentCheckIcon className="h-5" />
              <h1>1</h1>
            </div>
            <div>
              <h2>Historial Tickets</h2>
              <p>Siempre</p>
            </div>
          </div>
        </div>
        <div className={classes.Requests}>
          <div className={classes.Card}>
            <div>
              <DocumentIcon className="h-5" />
              <h1>1</h1>
            </div>
            <div>
              <h2>Solicitudes Total</h2>
              <p>Hoy</p>
            </div>
          </div>
          <div className={classes.Card}>
            <div>
              <DocumentIcon className="h-5" />
              <h1>1</h1>
            </div>
            <div>
              <h2>Solicitudes Pendientes</h2>
              <p>Hoy</p>
            </div>
          </div>
          <div className={classes.Card}>
            <div>
              <DocumentIcon className="h-5" />
              <h1>1</h1>
            </div>
            <div>
              <h2>Solicitudes Cerrados</h2>
              <p>Hoy</p>
            </div>
          </div>
          <div className={classes.Card}>
            <div>
              <ClipboardDocumentCheckIcon className="h-5  " />
              <h1>1</h1>
            </div>
            <div>
              <h2>Solicitudes Cerrados</h2>
              <p>Hoy</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
