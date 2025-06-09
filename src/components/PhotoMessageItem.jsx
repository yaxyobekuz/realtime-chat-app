import { useParams } from "react-router-dom";

// Components
import Icon from "./Icon";

// Hooks
import useModal from "@/hooks/useModal";

// Icons
import filesIcon from "../assets/icons/mini/files.svg";
import paymentIcon from "../assets/icons/mini/payment.svg";

// Helpers
import { formatTime, getBubbleBorderRadius } from "../utils/helpers";

const PhotoMessageItem = ({
  photo,
  _id: id,
  isAdmin,
  caption,
  createdAt,
  paymentId,
  passportId,
  isLastMessage,
  isFirstMessage,
  prevIsAdminMessage,
  nextIsAdminMessage,
}) => {
  const { chatId: currentChatId } = useParams();
  const chatId = Number(currentChatId) || false;
  const { open } = useModal("photoMessageContextMenu");
  const bubbleBorderRadius = getBubbleBorderRadius(
    isAdmin,
    isLastMessage,
    isFirstMessage,
    prevIsAdminMessage,
    nextIsAdminMessage
  );

  const handleOpenContextMenu = (e) => {
    e.preventDefault();
    open({
      chatId,
      paymentId,
      x: e.pageX,
      y: e.pageY,
      passportId,
      messageId: id,
      photoId: photo._id,
    });
  };

  return (
    <li
      onContextMenu={handleOpenContextMenu}
      id={id}
      className="group py-1 px-4"
    >
      <div
        className={`${
          isAdmin
            ? "bg-yellow-100 border-yellow-300 ml-auto"
            : "bg-white mr-auto"
        } ${
          bubbleBorderRadius.md
        } w-[310px] border p-2.5 rounded-[20px] space-y-2 leading-5 shadow shadow-neutral-200/70`}
      >
        {/* Photo */}
        <div className="relative">
          <img
            width={288}
            height={288}
            loading="lazy"
            src={photo.url}
            className={`${bubbleBorderRadius.sm} size-72 bg-neutral-50 object-cover`}
          />

          {/* Timestamp badge */}
          <div className="absolute bottom-2 right-2 bg-black/65 px-1.5 py-0.5 rounded-full">
            <span className="text-sm leading-none text-white">
              {formatTime(createdAt)}
            </span>
          </div>

          {/* Payment badge */}
          {paymentId ? (
            <div className="hidden absolute top-2 left-2 bg-black/65 px-1.5 py-0.5 rounded-lg group-hover:inline-block">
              <Icon
                size={20}
                alt="To'lov"
                src={paymentIcon}
                className="size-5"
              />
            </div>
          ) : null}

          {/* Passport badge */}
          {passportId ? (
            <div className="hidden absolute top-2 left-2 bg-black/65 px-1.5 py-0.5 rounded-lg group-hover:inline-block">
              <Icon
                size={20}
                alt="Passport"
                src={filesIcon}
                className="size-5"
              />
            </div>
          ) : null}
        </div>

        {/* Caption */}
        {caption && <p>{caption}</p>}
      </div>
    </li>
  );
};

export default PhotoMessageItem;
