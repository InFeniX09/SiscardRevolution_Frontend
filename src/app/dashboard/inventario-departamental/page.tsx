"use client";
import useSWR from "swr";
import React from "react";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Page = () => {
  const { data, error } = useSWR(
    "http://localhost:3100/centro-atencion/listarTicket",
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>loading ...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {data.Query3.map((user: any) => (
          <li key={user.IdTicket}>{user.Asunto}</li>
        ))}
      </ul>
    </div>
  );
};
export default Page;
