import { useLocation, useParams } from "react-router-dom";

// Components
import Icon from "./Icon";
import StatusDrawer from "./StatusDrawer";

// Redux (Store)
import { useSelector } from "react-redux";

// Helpers
import { formatDate, formatTime } from "../utils/helpers";

// Images
import filesIcon from "../assets/icons/files.svg";
import trashIcon from "../assets/icons/trash.svg";
import paymentIcon from "../assets/icons/payment.svg";
import messageIcon from "../assets/icons/message.svg";
import handIcon from "../assets/icons/hand-raised.svg";
import pencilIcon from "../assets/icons/pencil-square.svg";
import phoneIcon from "../assets/icons/phone-arrow-up.svg";

const Hr = () => <div className="w-full h-2 bg-neutral-50" />;

const ActionButtonSkeleton = () => (
  <div className="flex items-center gap-4 h-12 px-5 transition-colors duration-300 hover:bg-neutral-50">
    <div className="shrink-0 size-6 bg-neutral-100 rounded-full" />
    <div className="shrink-0 w-32 h-5 bg-neutral-100 rounded-lg" />
  </div>
);

const Header = () => (
  <div className="flex items-center px-5 h-16">
    <h2 className="text-xl font-medium">Chat ma'lumotlari</h2>
  </div>
);

const className = `shrink-0 w-[440px] max-h-full overflow-y-auto hidden-scroll border-l bg-white`;

const ChatDetails = () => {
  const { pathname } = useLocation();
  const { chatId: currentChatId } = useParams();
  const chatId = Number(currentChatId) || false;
  const { data: chatsData } = useSelector((state) => state.chats);
  const { data, isLoading } = useSelector((state) => state.messages);
  const chatStatus = chatsData?.find(({ id }) => id === chatId)?.status;

  const { user, createdAt, passportId, paymentId } = data[chatId] || {};
  const { photo, firstName, username, phone } = user || {};

  if (isLoading[chatId]) {
    return (
      <div className={className}>
        {/* Header */}
        <Header />

        {/* User profile */}
        <div className="flex items-center gap-4 px-4 py-4">
          <div className="shrink-0 size-20 bg-neutral-100 rounded-full" />

          <div className="w-full space-y-3">
            <div className="shrink-0 w-36 h-6 bg-neutral-100 rounded-lg" />

            {/* Username & Timestamp */}
            <div className="flex items-center justify-between w-full gap-2">
              <div className="shrink-0 w-20 h-5 bg-neutral-100 rounded-lg" />
              <div className="shrink-0 w-20 h-5 bg-neutral-100 rounded-lg" />
            </div>
          </div>
        </div>

        <Hr />

        <div className="py-2">
          {/* Passport */}
          <ActionButtonSkeleton />

          {/* Payment */}
          <ActionButtonSkeleton />

          {/* Write as telegram */}
          <ActionButtonSkeleton />

          {/* phone number */}
          <ActionButtonSkeleton />
        </div>

        <Hr />

        {/* Actions */}
        <div className="py-2">
          {/* Edit user */}
          <ActionButtonSkeleton />

          {/* Block user */}
          <ActionButtonSkeleton />

          {/* Delete user */}
          <ActionButtonSkeleton />
        </div>
      </div>
    );
  }

  return (
    <section className={className}>
      {/* Header */}
      <Header />

      {/* User profile */}
      <div className="flex items-center gap-4 px-4 py-4">
        {photo ? (
          <img
            width={80}
            height={80}
            src={photo.url}
            alt="User avatar"
            className="bg-neutral-50 size-20 rounded-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center shrink-0 size-20 bg-gradient-to-tr from-green-300 to-green-300 rounded-full">
            <span className="text-2xl text-white">
              {firstName?.length ? firstName[0] : "🗿"}
            </span>
          </div>
        )}

        <div className="w-full space-y-1.5">
          <h3 className="text-xl font-medium">{firstName || "Chat"}</h3>

          {/* Username & Timestamp */}
          <div className="flex items-center justify-between w-full gap-2">
            <p className="line-clamp-1 text-lg text-neutral-500">
              {username ? `@${username}` : "Mavjud emas!"}
            </p>

            {/* Timestamp */}
            <div className="shrink-0 text-sm leading-none">
              <span className="text-neutral-500 mr-2">
                {formatDate(createdAt)}
              </span>
              <span className="text-neutral-500">{formatTime(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <Hr />

      <div className="py-2">
        {/* Passport */}
        <a
          href={passportId ? `${pathname}#${passportId}` : undefined}
          className={`${
            passportId ? "hover:bg-neutral-50" : "opacity-30"
          } flex items-center gap-4 h-12 px-5 transition-colors duration-300`}
        >
          <Icon src={filesIcon} alt="Files" />
          <span>Pasport ma'lumotlari</span>
        </a>

        {/* Payment */}
        <a
          href={paymentId ? `${pathname}#${paymentId}` : undefined}
          className={`${
            paymentId ? "hover:bg-neutral-50" : "opacity-30"
          } flex items-center gap-4 h-12 px-5 transition-colors duration-300`}
        >
          <Icon src={paymentIcon} alt="Banknotes" />
          <span>To'lov ma'lumotlari</span>
        </a>

        {/* Write as telegram */}
        <a
          target="_blank"
          href={username ? `https://t.me/${username}` : undefined}
          className={`${
            username ? "hover:bg-neutral-50" : "opacity-30"
          } flex items-center gap-4 h-12 px-5 transition-colors duration-300`}
        >
          <Icon src={messageIcon} alt="Message" />
          <span>Telegramdan yozish</span>
        </a>

        {/* phone number */}
        <a
          href={phone ? `tel:+${phone}` : undefined}
          className={`${
            phone ? "hover:bg-neutral-50" : "opacity-30"
          } flex items-center gap-4 h-12 px-5 transition-colors duration-300`}
        >
          <Icon src={phoneIcon} alt="Phone" />
          <span>Qo'ng'iroq qilish</span>
        </a>
      </div>

      <Hr />

      {/* Actions */}
      <div className="py-2">
        {/* Edit user info */}
        <button className="flex items-center gap-4 w-full h-12 px-5 transition-colors duration-300 hover:bg-neutral-50">
          <Icon src={pencilIcon} alt="Pencil" />
          <span>Ma'lumotlarni o'zgartirish</span>
        </button>

        {/* Update user status */}
        <StatusDrawer
          chatId={chatId}
          firstName={firstName}
          defaultValue={chatStatus}
        />

        {/* Block user */}
        <button className="flex items-center gap-4 w-full h-12 px-5 text-red-500 transition-colors duration-300 hover:bg-red-50">
          <Icon src={handIcon} alt="Hand raised" />
          <span>Foydalanuvchini bloklash</span>
        </button>

        {/* Delete user */}
        <button className="flex items-center gap-4 w-full h-12 px-5 text-red-500 transition-colors duration-300 hover:bg-red-50">
          <Icon src={trashIcon} alt="Trash" />
          <span>Chatni o'chirish</span>
        </button>
      </div>
    </section>
  );
};

export default ChatDetails;
