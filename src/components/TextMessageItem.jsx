import { getBubbleBorderRadius } from "../utils/helpers";

const TextMessageItem = ({
  text,
  isAdmin,
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
    <li className="flex py-1 px-4">
      <div
        className={`${
          isAdmin
            ? "bg-yellow-100 border-yellow-300 ml-auto"
            : "bg-white mr-auto"
        } ${bubbleBorderRadius} inline-block max-w-[calc(100%-64px)] border px-3 py-2.5 leading-5 shadow shadow-neutral-200/70`}
      >
        <span className="break-words">{text}</span>
      </div>
    </li>
  );
};

export default TextMessageItem;
