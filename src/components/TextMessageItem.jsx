import { formatTime, getBubbleBorderRadius } from "../utils/helpers";

const TextMessageItem = ({
  text,
  isAdmin,
  createdAt,
  isLastMessage,
  isFirstMessage,
  prevIsAdminMessage,
  nextIsAdminMessage,
}) => {
  const bubbleBorderRadius = getBubbleBorderRadius(
    isAdmin,
    isLastMessage,
    isFirstMessage,
    prevIsAdminMessage,
    nextIsAdminMessage
  ).md;

  return (
    <li className="flex relative pt-1 pb-4 px-4">
      <div
        className={`${
          isAdmin
            ? "bg-yellow-100 border-yellow-300 ml-auto"
            : "bg-white mr-auto"
        } ${bubbleBorderRadius} inline-block max-w-[calc(100%-64px)] border px-3 py-2.5 leading-5 shadow shadow-neutral-200/70`}
      >
        <span className="break-words">{text}</span>
      </div>

      {/* Timestamp */}
      <span
        className={`${
          isAdmin ? "right-7" : "left-7"
        } absolute -bottom-[5px] text-sm`}
      >
        {formatTime(createdAt)}
      </span>
    </li>
  );
};

export default TextMessageItem;
