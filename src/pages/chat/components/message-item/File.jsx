// Components
import Icon from "../../../../components/Icon";

// Helpers
import {
  formatTime,
  formatFileSize,
  getBubbleBorderRadius,
} from "../../../../utils/helpers";

// Icons
import fileIcon from "../../../../assets/icons/mini/file-text-white.svg";


const File = ({
  file,
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
    <li id={id} className="py-1 px-4">
      <div
        className={`${
          isAdmin
            ? "bg-yellow-100 border-yellow-300 ml-auto"
            : "bg-white mr-auto"
        } ${
          bubbleBorderRadius.md
        } w-[310px] border p-2.5 rounded-20  leading-5 shadow shadow-neutral-200/70`}
      >
        <div
          className={`${
            !file ? "opacity-50" : ""
          } flex items-center gap-3 mb-2`}
        >
          {/* File Icon */}
          <FileLink url={file?.fileUrl} />

          {/* File Info */}
          <div className="inline-block space-y-0.5">
            <h3 className="line-clamp-1 font-medium">
              {file?.fileName || "Mavjud emas"}
            </h3>

            <span className="inline-block text-neutral-500 text-sm">
              {formatFileSize(file?.fileSize)}
            </span>
          </div>
        </div>

        {/* Caption */}
        {caption && (
          <p
            className="message-item"
            dangerouslySetInnerHTML={{
              __html: caption?.replaceAll("\n", "<br>"),
            }}
          />
        )}

        {/* Timestamp badge */}
        <span className="block text-right text-sm leading-none">
          {formatTime(createdAt)}
        </span>
      </div>
    </li>
  );
};

const FileLink = ({ url }) => (
  <a
    href={url ? url : undefined}
    target={url ? "_blank" : "_self"}
    className={`${
      !url ? "select-none" : ""
    } flex items-center justify-center shrink-0 size-12 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full`}
  >
    <Icon src={fileIcon} alt="Fayl" />
  </a>
);

export default File;
