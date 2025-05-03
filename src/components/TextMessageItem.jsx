import { getBubbleBorderRadius } from "../utils/helpers";

const TextMessageItem = ({
  text,
  _id: id,
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
    <li
      id={id}
      className={`${
        isAdmin ? "bg-yellow-100 border-yellow-300 ml-auto" : "bg-white mr-auto"
      } ${bubbleBorderRadius} inline-block max-w-[calc(100%-96px)] border px-3 py-2.5 leading-5 shadow shadow-neutral-200/70`}
    >
      <span>{text}</span>
    </li>
  );
};

export default TextMessageItem;
