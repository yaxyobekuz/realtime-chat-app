import TicketsList from "@/components/TicketsList";
import TicketsPageHeader from "@/components/TicketsPageHeader";

const Tickets = () => {
  return (
    <div className="size-full border-l">
      <TicketsPageHeader />
      <TicketsList />
    </div>
  );
};

export default Tickets;
