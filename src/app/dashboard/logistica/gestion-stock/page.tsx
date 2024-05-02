import ModalGestionEquipoStock from "@/src/components/ui/Modal/ModalGestionEquipoStock";
import TabGestionStock from "@/src/components/ui/Tabs/TabGestionStock";
import React from "react";

export default function page() {
  return (
    <>
      <ModalGestionEquipoStock />
      <TabGestionStock />
    </>
  );
}
