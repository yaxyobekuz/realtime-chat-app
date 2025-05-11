import { useState } from "react";
import { useParams } from "react-router-dom";

// UI components
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuTrigger,
} from "./ui/context-menu";

// Toast
import { toast } from "@/notification/toast";

// Services
import messageService from "@/api/services/messageService";

// Helpers
import { formatTime, getBubbleBorderRadius } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { updateSingleChatMessagesInStore } from "@/store/features/messagesSlice";

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
  const dispatch = useDispatch();
  const { chatId: currentChatId } = useParams();
  const chatId = Number(currentChatId) || false;
  const [isLoading, setIsLoading] = useState(false);
  const bubbleBorderRadius = getBubbleBorderRadius(
    isAdmin,
    isLastMessage,
    isFirstMessage,
    prevIsAdminMessage,
    nextIsAdminMessage
  );

  const { chatId: messageGroupId } = useParams();

  const updateMessageGroupField = (fieldValue, fieldLabel) => {
    if (isLoading) return;

    setIsLoading(true);

    toast.promise(
      messageService
        .updateMessageGroupField(messageGroupId, fieldValue, id)
        .then(({ fieldName, updatedId }) => {
          dispatch(
            updateSingleChatMessagesInStore({
              id: chatId,
              [fieldName]: updatedId,
            })
          );
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false)),
      {
        error: `${fieldLabel} ma'lumoti yangilanmadi`,
        success: `${fieldLabel} ma'lumoti yangilandi`,
        loading: `${fieldLabel} ma'lumoti yangilanmoqda...`,
      }
    );
  };

  return (
    <ContextMenu>
      {/* Context Menu Trigger */}
      <ContextMenuTrigger
        onContextMenu={(e) =>
          isAdmin || isLoading ? e.preventDefault() : null
        }
      >
        <li id={id} className="py-1 px-4">
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
            </div>

            {/* Caption */}
            {caption && <p>{caption}</p>}
          </div>
        </li>
      </ContextMenuTrigger>

      {/* Context Menu Content */}
      <ContextMenuContent>
        {/* Passport */}
        <ContextMenuItem>
          <button
            className="flex items-center gap-4 px-2 py-1.5"
            onClick={() => updateMessageGroupField("passportId", "Passport")}
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

            <span>Pasport deb belgilash</span>
          </button>
        </ContextMenuItem>

        {/* Payment */}
        <ContextMenuItem>
          <button
            className="flex items-center gap-4 px-2 py-1.5"
            onClick={() => updateMessageGroupField("paymentId", "To'lov")}
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

            <span>To'lov deb belgilash</span>
          </button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default PhotoMessageItem;
