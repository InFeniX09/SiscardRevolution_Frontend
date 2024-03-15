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
      <div className={`bg-white/45 grid grid-cols-2 gap-x-4 items-center px-8 py-2 rounded-xl`}>
        <div className="flex items-center justify-center gap-3">
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
