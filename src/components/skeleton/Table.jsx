const Table = () => {
  return (
    <div className="p-5 animate-pulse max-h-[calc(100%-64px)] overflow-y-auto">
      <div className="overflow-hidden border rounded-20">
        <div className="w-full h-14 bg-white border-b" />
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="w-full h-12 even:bg-white/70"></div>
        ))}
      </div>
    </div>
  );
};

export default Table;
