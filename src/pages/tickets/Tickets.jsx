// Componetns
import TicketsList from "@/pages/tickets/components/TicketsList";
import TicketsPageHeader from "@/pages/tickets/components/Header";

const Tickets = () => {
  return (
    <div className="size-full border-l">
      <TicketsPageHeader />
      <TicketsList />
    </div>
  );
};

export default Tickets;
