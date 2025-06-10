import React, { useEffect } from "react";

// Toast (Notification)
import { toast } from "@/notification/toast";

// Components
import PaymentsSkeleton from "./skeleton/Payments";

// Hooks
import useImageViewer from "@/hooks/useImageViewer";

// Redux (Store)
import {
  setPassportsLoading,
  updatePassportsFromStore,
} from "@/store/features/passportsSlice";
import { useDispatch, useSelector } from "react-redux";

// Helpers
import { formatDate, formatTime } from "@/utils/helpers";

// Services
import passportService from "@/api/services/passportService";

const PassportsList = () => {
  const dispatch = useDispatch();
  const { isLoading, data: passports } = useSelector(
    (state) => state.passports
  );

  const loadPassports = () => {
    dispatch(setPassportsLoading(true));

    passportService
      .getPassports()
      .then((res) => {
        if (!res.ok) throw new Error();
        dispatch(updatePassportsFromStore(res.data));
      })
      .catch((err) => {
        toast.error(err.message || "Pasportlarni yuklab bo'lmadi");
      })
      .finally(() => dispatch(setPassportsLoading(false)));
  };

  useEffect(() => {
    if (passports.length === 0) {
      loadPassports();
    } else {
      dispatch(setPassportsLoading(false));
    }
  }, []);

  // Skeleton loader
  if (isLoading) return <PaymentsSkeleton />;

  // Passports list
  return <List passports={passports} />;
};

export default PassportsList;

const List = ({ passports }) => {
  const { viewImage } = useImageViewer();
  return (
    <ul className="grid grid-cols-6 gap-5 max-h-[calc(100%-64px)] overflow-y-auto p-5">
      {passports.map(({ _id: id, photo, createdAt, user }) => {
        const url = photo.url;
        return (
          <li key={id} className="w-full bg-white p-2.5 rounded-20 border">
            {/* Image */}
            <div className="relative w-full mb-1.5">
              <img
                width={256}
                height={256}
                loading="lazy"
                src={photo.url}
                alt="Pasport rasmi"
                onClick={() => viewImage({ url, alt: "Pasport rasmi" })}
                className="w-full h-auto aspect-square bg-neutral-100 rounded-xl"
              />

              <div className="flex gap-1.5 absolute bottom-2 right-2">
                {/* Time */}
                <div className="bg-black/65 h-6 px-1.5 rounded-full">
                  <span className="text-sm leading-none text-white">
                    {formatTime(createdAt)}
                  </span>
                </div>

                {/* Date */}
                <div className="bg-black/65 h-6 px-1.5 rounded-full">
                  <span className="text-sm leading-none text-white">
                    {formatDate(createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <h3 className="break-words text-lg font-medium">
              {user.firstName}
            </h3>
          </li>
        );
      })}
    </ul>
  );
};
