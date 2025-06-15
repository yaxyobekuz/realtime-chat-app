// Components
import Header from "@/pages/user-tickets/components/Header";
import TicketsList from "@/pages/user-tickets/components/TicketsList";

const UserTickets = () => {
  return (
    <div className="size-full border-l">
      <Header />
      <TicketsList />
    </div>
  );
};

export default UserTickets;
