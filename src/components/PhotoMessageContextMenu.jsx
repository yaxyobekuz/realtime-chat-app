import { useMemo } from "react";

// Components
import Icon from "./Icon";

// Hooks
import useModal from "@/hooks/useModal";

// Icons
import filesIcon from "../assets/icons/outline/files.svg";
import trashIcon from "../assets/icons/outline/trash.svg";
import paymentIcon from "../assets/icons/outline/payment.svg";

// Dropdown menu components
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const PhotoMessageContextMenu = () => {
  const { isOpen, close, data, open } = useModal("photoMessageContextMenu");
  const {
    x = 0,
    y = 0,
    chatId,
    photoId,
    paymentId,
    messageId,
    passportId,
  } = data || {};

  const handleOpenModal = (modal) => {
    close();
    const payload = { chatId, messageId, photoId, passportId };
    setTimeout(() => open(payload, modal), 0);
  };

  const menuItems = useMemo(() => {
    if (!paymentId && !passportId) {
      return [
        {
          alt: "Pasport",
          key: "passport",
          icon: filesIcon,
          label: "Pasport deb belgilash",
          onSelect: () => handleOpenModal("passport"),
        },
        {
          alt: "To'lov",
          key: "payment",
          icon: paymentIcon,
          label: "To'lov deb belgilash",
          onSelect: () => handleOpenModal("payment"),
        },
      ];
    }

    if (paymentId) {
      return [
        {
          alt: "To'lov",
          icon: paymentIcon,
          key: "payment-details",
          label: "To'lov ma'lumotlari",
          onSelect: () => handleOpenModal("paymentDetails"),
        },
        {
          icon: trashIcon,
          alt: "Chiqitdon",
          key: "delete-payment",
          textColor: "text-red-500",
          label: "To'lovni o'chirish",
          onSelect: () => handleOpenModal("deletePaymentDetails"),
        },
      ];
    }

    if (passportId) {
      return [
        {
          alt: "To'lov",
          icon: paymentIcon,
          key: "passport-details",
          label: "To'lov ma'lumotlari",
          onSelect: () => handleOpenModal("passportDetails"),
        },
        {
          icon: trashIcon,
          alt: "Chiqitdon",
          key: "delete-passport",
          textColor: "text-red-500",
          label: "To'lovni o'chirish",
          onSelect: () => handleOpenModal("deletePassportDetails"),
        },
      ];
    }
  }, [paymentId, passportId, close]);

  return (
    <DropdownMenu.Root open={isOpen} setOpenChange={(open) => !open && close()}>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={5}
          onEscapeKeyDown={close}
          style={{ top: y, left: x }}
          onPointerDownOutside={close}
          className="absolute z-20 min-w-max rounded-xl border bg-white p-1.5 shadow-md"
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.key}
              alt={item.alt}
              icon={item.icon}
              label={item.label}
              onSelect={item.onSelect}
              textColor={item.textColor}
            />
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const MenuItem = ({ icon, alt = "", label = "", textColor = "", onSelect }) => (
  <DropdownMenu.Item
    onSelect={onSelect}
    className="flex items-center gap-3 px-2.5 py-1.5 rounded transition-colors duration-200 hover:bg-neutral-100 outline-none cursor-pointer"
  >
    <Icon src={icon} alt={alt} />
    <span className={textColor}>{label}</span>
  </DropdownMenu.Item>
);

export default PhotoMessageContextMenu;
