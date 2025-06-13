import UserTicketsList from "@/components/UserTicketsList";
import UserTicketPageHeader from "@/components/UserTicketPageHeader";

const UserTickets = () => {
  return (
    <div className="size-full border-l">
      <UserTicketPageHeader />
      <UserTicketsList />
    </div>
  );
};

export default UserTickets;
