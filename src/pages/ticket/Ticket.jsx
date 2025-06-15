// Components
import SendTicketModal from "@/components/SendTicketModal";
import TicketPageBody from "@/pages/ticket/components/Body";
import TicketPageHeader from "@/pages/ticket/components/Header";

const Ticket = () => {
  return (
    <>
      <div className="size-full border-l">
        <TicketPageHeader />
        <TicketPageBody />
      </div>

      <SendTicketModal />
    </>
  );
};

export default Ticket;
