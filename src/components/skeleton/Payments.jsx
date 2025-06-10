const Payments = () => {
  return (
    <ul className="grid grid-cols-6 gap-5 p-5 animate-pulse max-h-[calc(100%-64px)] overflow-y-auto">
      {Array.from({ length: 20 }).map((_, index) => (
        <li key={index} className="w-full h-[309px] bg-white p-2.5 rounded-20 border">
          <span className="block w-full h-auto aspect-square bg-neutral-50 rounded-xl" />
        </li>
      ))}
    </ul>
  );
};

export default Payments;
