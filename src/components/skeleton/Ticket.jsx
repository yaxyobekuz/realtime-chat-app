const Ticket = () => {
  return (
    <div className="animate-pulse p-5 space-y-5">
      {/* Top */}
      <div className="grid grid-cols-3 gap-5">
        {/* File */}
        <div className="w-full bg-white p-2.5 rounded-20 border">
          <div className="w-full h-96 bg-neutral-50 mb-3.5 rounded-xl" />
          <div className="w-1/2 h-6 bg-neutral-50 rounded-xl" />
        </div>

        {/* Passport */}
        <div className="w-full bg-white p-2.5 rounded-20 border">
          <div className="w-full h-96 bg-neutral-50 mb-3.5 rounded-xl" />
          <div className="w-1/2 h-6 bg-neutral-50 rounded-xl" />
        </div>

        {/* Payment */}
        <div className="w-full bg-white p-2.5 rounded-20 border">
          <div className="w-full h-96 bg-neutral-50 mb-3.5 rounded-xl" />
          <div className="w-1/2 h-6 bg-neutral-50 rounded-xl" />
        </div>
      </div>

      {/* Mid */}
      <div className="grid grid-cols-2 gap-5">
        {/* User info */}
        <div className="w-full bg-white p-5 rounded-20 border">
          <div className="flex items-center gap-3.5">
            <div className="shrink-0 size-[68px] bg-neutral-50 rounded-full" />
            <div className="w-full">
              <div className="w-1/2 h-7 bg-neutral-50 mb-3 rounded-xl" />
              <div className="w-1/4 h-7 bg-neutral-50 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Ticket description */}
        <div className="w-full bg-white p-5 rounded-20 border">
          <div className="w-1/2 h-7 bg-neutral-50 mb-3 rounded-xl" />
          <div className="w-1/4 h-7 bg-neutral-50 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default Ticket;
