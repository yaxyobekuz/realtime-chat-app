// Data
import statuses from "@/data/statuses";

const SidebarTabs = ({ updateChatStatus, chatStatus }) => {
  const inactiveClass = "group-hover:bg-white";
  const activeClass = "bg-blue-100 text-blue-800";

  const getClass = (value) => {
    const c = value ? activeClass : inactiveClass;
    return c + " p-3 rounded-lg transition-colors duration-200";
  };

  return (
    <div className="w-full h-[70px]">
      <ul className="flex gap-1.5 size-full overflow-x-auto sidebar-tabs-scroll px-2.5">
        {/* All */}
        <li className="shrink-0 h-full">
          <button
            onClick={() => updateChatStatus()}
            className="flex items-start group h-full"
          >
            <span className={getClass(!chatStatus)}>Barchasi</span>
          </button>
        </li>

        {/* Other statuses */}
        {statuses.map(({ label, value }, index) => (
          <li key={index} className="shrink-0 h-full">
            <button
              className="flex items-start group h-full"
              onClick={() => updateChatStatus(value)}
            >
              <span className={getClass(chatStatus === value)}>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarTabs;
