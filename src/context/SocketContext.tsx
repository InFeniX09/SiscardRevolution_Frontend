import React, { createContext, ReactNode } from 'react';
import { Socket } from 'socket.io-client';
import { useSocket } from '../hooks/useSocket';
import { environment } from '../environments/environment';

interface SocketContextProps {
  children: React.ReactNode;
}

interface SocketContextValue {
  socket: Socket | null;
  online: boolean;
}

export const SocketContext = createContext<SocketContextValue>({
  socket: null,
  online: false,
});

export function SocketProvider({children}:SocketContextProps){
    const { socket, online } = useSocket(environment.baseUrl);
  
    return (
      <SocketContext.Provider value={{ socket, online }}>
        {children}
      </SocketContext.Provider>
    );
  };