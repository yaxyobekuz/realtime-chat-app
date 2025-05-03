import { formatTime, getBubbleBorderRadius } from "../utils/helpers";

const PhotoMessageItem = ({
  photo,
  _id: id,
  isAdmin,
  caption,
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
  );

  return (
    <li
      id={id}
      className={`${isAdmin ? "bg-neutral-50 ml-auto" : "bg-white mr-auto"} ${
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
      </div>

      {/* Caption */}
      {caption && <p>{caption}</p>}
    </li>
  );
};

export default PhotoMessageItem;
