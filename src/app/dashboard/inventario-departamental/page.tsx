import TableComponent from "@/src/components/ui/Table/Table";
import {
  columnslistarTicket,
  getlistarTicket,
} from "@/src/actions/auth/buscar-usuario";

export default async function Page() {

  const users1 = await getlistarTicket();

  return (
    <>
      <TableComponent
        columns={columnslistarTicket}
        users={users1}
        rowKey="IdTicket"
      />
    </>
  );
}
