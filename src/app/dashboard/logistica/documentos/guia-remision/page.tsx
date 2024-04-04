"use client";
import { getlistarAlmacenxAlbaranSalida } from "@/src/actions/logistica/guia-remision";
import RadiogroupComponent from "@/src/components/ui/Radiogroup/Radiogroup";
import SelectComponent from "@/src/components/ui/Select/Select";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function page() {
  const [Albaranes, setAlbaranes] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getlistarAlmacenxAlbaranSalida();
        setAlbaranes(response);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    // Only call fetchData when session.status changes from any value to 'authenticated'
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  return (
    <>
      <SelectComponent
        array={Albaranes}
        value="almacen_id"
        texts={["almacen_id", "sDsAlmacen", "cliente_id"]}
        label="Zona"
        placeholder="Seleccione una zona"
        prop={{ ...register("Zona", { required: true }) }}
      />
      <div className="bg-white w-full h-[90%] border-[rgba(0,0,0,0.3)] border-2 rounded-xl p-4">
        <RadiogroupComponent></RadiogroupComponent>
      </div>
    </>
  );
}
