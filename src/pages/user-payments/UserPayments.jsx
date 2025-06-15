// Components
import Header from "@/pages/user-payments/components/Header";
import PaymentsList from "@/pages/user-payments/components/PaymentsList";

const UserPayments = () => {
  return (
    <div className="size-full border-l">
      <Header />
      <PaymentsList />
    </div>
  );
};

export default UserPayments;
