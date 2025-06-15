import { Link, useLocation, useParams } from "react-router-dom";

// Redux (Store)
import { useSelector } from "react-redux";

// Hooks
import useModal from "@/hooks/useModal";
import useImageViewer from "@/hooks/useImageViewer";

// Components
import Icon from "../../../components/Icon";
import UserPhoto from "../../../components/UserPhoto";
import StatusDrawer from "../../../components/StatusDrawer";

// Helpers
import { formatDate, formatTime } from "../../../utils/helpers";

// Icons
import filesIcon from "../assets/icons/outline/files.svg";
import trashIcon from "../assets/icons/outline/trash.svg";
import ticketIcon from "../assets/icons/outline/ticket.svg";
import paymentIcon from "../assets/icons/outline/payment.svg";
import messageIcon from "../assets/icons/outline/message.svg";
import handIcon from "../assets/icons/outline/hand-raised.svg";
import pencilIcon from "../assets/icons/outline/pencil-square.svg";
import phoneIcon from "../assets/icons/outline/phone-arrow-up.svg";

// Divider line component
const Divider = () => <div className="w-full h-2 bg-neutral-50" />;

// Skeleton for action buttons while loading
const ActionSkeleton = () => (
  <div className="flex items-center gap-4 h-12 px-5 transition-colors duration-300 hover:bg-neutral-50">
    <div className="shrink-0 size-6 bg-neutral-100 rounded-full" />
    <div className="shrink-0 w-32 h-5 bg-neutral-100 rounded-lg" />
  </div>
);

// Section header component
const SectionHeader = () => (
  <div className="flex items-center px-5 h-16">
    <h2 className="text-xl font-medium">Chat ma'lumotlari</h2>
  </div>
);

// Main wrapper styling
const drawerClasses = `shrink-0 w-[440px] max-h-full overflow-y-auto hidden-scroll border-l bg-white`;

const RightSide = () => {
  const { pathname } = useLocation();
  const { chatId: paramChatId } = useParams();
  const chatId = Number(paramChatId) || false;

  // Redux selectors
  const { data: allChats, isLoading } = useSelector((state) => state.chats);

  const currentChat = allChats.find(({ id }) => id == chatId) || {};
  const { user = {}, createdAt, passportId, paymentId } = currentChat;
  const currentChatStatus = allChats?.find(({ id }) => id === chatId)?.status;
  const { photo, firstName, username, phone, _id: userId } = user;

  const { open: openModal } = useModal();
  const { viewImage } = useImageViewer();

  // Display skeleton loader while chat data is loading
  if (isLoading[chatId]) {
    return (
      <div className={drawerClasses}>
        <SectionHeader />

        {/* Loading state for user profile */}
        <div className="flex items-center gap-4 px-4 py-4">
          <div className="shrink-0 size-20 bg-neutral-100 rounded-full" />
          <div className="w-full space-y-3">
            <div className="w-36 h-6 bg-neutral-100 rounded-lg" />
            <div className="flex items-center justify-between w-full gap-2">
              <div className="w-20 h-5 bg-neutral-100 rounded-lg" />
              <div className="w-20 h-5 bg-neutral-100 rounded-lg" />
            </div>
          </div>
        </div>

        <Divider />

        {/* Loading action buttons */}
        <div className="py-2">
          <ActionSkeleton />
          <ActionSkeleton />
          <ActionSkeleton />
          <ActionSkeleton />
        </div>

        <Divider />

        <div className="py-2">
          <ActionSkeleton />
          <ActionSkeleton />
          <ActionSkeleton />
        </div>
      </div>
    );
  }

  return (
    <section className={drawerClasses}>
      <SectionHeader />

      {/* User Info */}
      <div className="flex items-center gap-4 px-4 py-4">
        <UserPhoto url={photo?.url} user={user} />

        <div className="w-full space-y-1.5">
          <h3 className="text-xl font-medium">{firstName || "Chat"}</h3>
          <div className="flex items-center justify-between w-full gap-2">
            <p className="line-clamp-1 text-lg text-neutral-500">
              {username ? `@${username}` : "Mavjud emas!"}
            </p>
            <div className="shrink-0 text-sm leading-none text-neutral-500">
              <span className="mr-2">{formatDate(createdAt)}</span>
              <span>{formatTime(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* User Documents and Contact */}
      <div className="py-2">
        <SidebarLink
          icon={filesIcon}
          isActive={!!passportId}
          label="Pasport ma'lumotlari"
          href={passportId && `${pathname}#${passportId}`}
        />

        <SidebarLink
          icon={paymentIcon}
          isActive={!!paymentId}
          label="To'lov ma'lumotlari"
          href={paymentId && `${pathname}#${paymentId}`}
        />

        <SidebarLink
          isPage={true}
          isActive={true}
          icon={ticketIcon}
          label="Chiptalar"
          href={`/tickets/user/${userId}`}
        />

        <SidebarLink
          external
          icon={messageIcon}
          isActive={!!username}
          label="Telegramdan yozish"
          href={username && `https://t.me/${username}`}
        />

        <SidebarLink
          icon={phoneIcon}
          isActive={!!phone}
          label="Qo'ng'iroq qilish"
          href={phone && `tel:+${phone}`}
        />
      </div>

      <Divider />

      {/* User Actions */}
      <div className="py-2">
        <ActionButton icon={pencilIcon} label="Ma'lumotlarni o'zgartirish" />

        <ActionButton
          icon={ticketIcon}
          label="Chipta yaratish"
          onClick={() => openModal({ chatId, user }, "createTicket")}
        />

        <StatusDrawer
          chatId={chatId}
          firstName={firstName}
          defaultValue={currentChatStatus}
        />

        <ActionButton
          icon={handIcon}
          label="Foydalanuvchini bloklash"
          className="text-red-500 hover:bg-red-50"
        />

        <ActionButton
          icon={trashIcon}
          label="Chatni o'chirish"
          className="text-red-500 hover:bg-red-50"
        />
      </div>
    </section>
  );
};

// Reusable sidebar link component
const SidebarLink = ({
  icon,
  href,
  label,
  isActive,
  isPage = false,
  external = false,
}) => {
  if (isPage) {
    return (
      <Link
        to={href}
        className={`${
          isActive ? "hover:bg-neutral-50" : "opacity-30 cursor-not-allowed"
        } flex items-center gap-4 h-12 px-5 transition-colors duration-300`}
      >
        <Icon src={icon} alt={label} />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      className={`${
        isActive ? "hover:bg-neutral-50" : "opacity-30 cursor-not-allowed"
      } flex items-center gap-4 h-12 px-5 transition-colors duration-300`}
    >
      <Icon src={icon} alt={label} />
      <span>{label}</span>
    </a>
  );
};

// Reusable action button component
const ActionButton = ({ icon, label, className = "", onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-4 w-full h-12 px-5 transition-colors duration-300 hover:bg-neutral-50 ${className}`}
  >
    <Icon src={icon} alt={label} />
    <span>{label}</span>
  </button>
);

export default RightSide;
