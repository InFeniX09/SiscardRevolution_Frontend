import { TablaMarcaComponent } from "@/src/components/ui/Table/Table";
import { getlistarMarca } from "@/src/actions/auth/buscar-usuario";
import React from "react";

export default async function MarcaPage() {

  const marca = await getlistarMarca();

  return (
    <>
      <TablaMarcaComponent marca={marca} />
    </>
  );
}
