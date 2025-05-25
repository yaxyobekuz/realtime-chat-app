import statuses from "@/data/statuses";

const SidebarTabs = () => {
  return (
    <div className="w-full h-[70px] bg-neutral-50">
      <ul className="flex items-center gap-0.5 size-full overflow-x-auto hidden-scroll px-2.5">
        {statuses.map(({ label, value }, index) => (
          <li key={index} className="shrink-0 h-full">
            <button className="group h-full">
              <span className="p-3 rounded-lg transition-colors duration-200 group-hover:bg-white">
                {label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarTabs;
