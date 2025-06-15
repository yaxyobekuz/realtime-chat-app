// Components
import UserTicketsList from "@/pages/user-tickets/components/TicketsList";
import UserTicketPageHeader from "@/pages/user-tickets/components/Header";

const UserTickets = () => {
  return (
    <div className="size-full border-l">
      <UserTicketPageHeader />
      <UserTicketsList />
    </div>
  );
};

export default UserTickets;
