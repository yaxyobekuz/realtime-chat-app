import UserTicketsList from "@/components/UserTicketsList";
import TicketsPageHeader from "@/components/TicketsPageHeader";

const UserTickets = () => {
  return (
    <div className="size-full border-l">
      <TicketsPageHeader />
      <UserTicketsList />
    </div>
  );
};

export default UserTickets;
