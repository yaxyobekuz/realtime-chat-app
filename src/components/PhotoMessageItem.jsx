import { useState } from "react";
import { useParams } from "react-router-dom";

// Components
import Icon from "./Icon";

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
import chatService from "@/api/services/chatService";

// Icons
import filesIcon from "../assets/icons/files.svg";
import paymentIcon from "../assets/icons/payment.svg";

// Helpers
import { formatTime, getBubbleBorderRadius } from "../utils/helpers";

// Redux (Store)
import { useDispatch } from "react-redux";
import { updateSingleChatInStore } from "@/store/features/chatsSlice";

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

  const updateChatStatus = (fieldValue, fieldLabel) => {
    if (isLoading) return;

    setIsLoading(true);

    toast.promise(
      chatService
        .updateChatField(messageGroupId, fieldValue, id)
        .then((res) => {
          const { fieldName, updatedId } = res?.data || {};
          const payload = { id: chatId, [fieldName]: updatedId };
          dispatch(updateSingleChatInStore(payload));
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
        asChild
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
            onClick={() => updateChatStatus("passportId", "Passport")}
          >
            <Icon src={filesIcon} alt="Pasport ma'lumotlari" />
            <span>Pasport deb belgilash</span>
          </button>
        </ContextMenuItem>

        {/* Payment */}
        <ContextMenuItem>
          <button
            className="flex items-center gap-4 px-2 py-1.5"
            onClick={() => updateChatStatus("paymentId", "To'lov")}
          >
            <Icon src={paymentIcon} alt="To'lov ma'lumotlari" />
            <span>To'lov deb belgilash</span>
          </button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default PhotoMessageItem;
