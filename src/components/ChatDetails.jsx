import { useLocation, useParams } from "react-router-dom";

// Components
import StatusDrawer from "./StatusDrawer";

// Redux (Store)
import { useSelector } from "react-redux";

// Helpers
import { formatDate, formatTime } from "../utils/helpers";

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
          href={`${pathname}#${passportId}`}
          className="flex items-center gap-4 h-12 px-5 transition-colors duration-300 hover:bg-neutral-50"
        >
          <svg
            fill="none"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            className="size-6"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
            />
          </svg>

          <span>Pasport ma'lumotlari</span>
        </a>

        {/* Payment */}
        <a
          href={`${pathname}#${paymentId}`}
          className="flex items-center gap-4 h-12 px-5 transition-colors duration-300 hover:bg-neutral-50"
        >
          <svg
            fill="none"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            className="size-6"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>

          <span>To'lov ma'lumotlari</span>
        </a>

        {/* Write as telegram */}
        <a
          target="_blank"
          href={username ? `https://t.me/${username}` : "false"}
          className="flex items-center gap-4 h-12 px-5 transition-colors duration-300 hover:bg-neutral-50"
        >
          <svg
            fill="none"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            className="size-6"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>

          <span>Telegramdan yozish</span>
        </a>

        {/* phone number */}
        <a
          href={phone ? `tel:+${phone}` : "false"}
          className="flex items-center gap-4 h-12 px-5 transition-colors duration-300 hover:bg-neutral-50"
        >
          <svg
            fill="none"
            strokeWidth="1.5"
            className="size-6"
            viewBox="0 0 24 24"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
            />
          </svg>

          <span>Qo'ng'iroq qilish</span>
        </a>
      </div>

      <Hr />

      {/* Actions */}
      <div className="py-2">
        {/* Edit user info */}
        <button className="flex items-center gap-4 w-full h-12 px-5 transition-colors duration-300 hover:bg-neutral-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>

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
          <svg
            fill="none"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            className="size-6"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"
            />
          </svg>

          <span>Foydalanuvchini bloklash</span>
        </button>

        {/* Delete user */}
        <button className="flex items-center gap-4 w-full h-12 px-5 text-red-500 transition-colors duration-300 hover:bg-red-50">
          <svg
            fill="none"
            strokeWidth="1.5"
            className="size-6"
            viewBox="0 0 24 24"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>

          <span>Chatni o'chirish</span>
        </button>
      </div>
    </section>
  );
};

export default ChatDetails;
