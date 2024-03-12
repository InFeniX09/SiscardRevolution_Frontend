interface Props {
  icon: React.ReactNode;
  cantidad: number;
  titulo: string;
  dia: string;
}

export default function CardinfoComponent({
  icon,
  cantidad,
  titulo,
  dia,
}: Props) {
  return (
    <>
      <div className="bg-red-500/45 grid grid-cols-2 gap-x-4 items-center px-8 py-4 rounded-xl">
        <div>
          {icon}
          <h1>{cantidad}</h1>
        </div>
        <div>
          <h2>{titulo}</h2>
          <p>{dia}</p>
        </div>
      </div>
    </>
  );
}
