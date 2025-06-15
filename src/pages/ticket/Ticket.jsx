// Components
import Body from "@/pages/ticket/components/Body";
import Header from "@/pages/ticket/components/Header";
import SendTicketModal from "@/components/SendTicketModal";

const Ticket = () => {
  return (
    <>
      <div className="size-full border-l">
        <Header />
        <Body />
      </div>

      <SendTicketModal />
    </>
  );
};

export default Ticket;
