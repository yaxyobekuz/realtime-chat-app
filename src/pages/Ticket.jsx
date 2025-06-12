// Components
import TicketPageBody from "@/components/TicketPageBody";
import TicketPageHeader from "@/components/TicketPageHeader";

const Ticket = () => {
  return (
    <div className="size-full border-l">
      <TicketPageHeader />
      <TicketPageBody />
    </div>
  );
};

export default Ticket;
