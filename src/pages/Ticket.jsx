// Components
import TicketPageBody from "@/components/TicketPageBody";
import SendTicketModal from "@/components/SendTicketModal";
import TicketPageHeader from "@/components/TicketPageHeader";

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
