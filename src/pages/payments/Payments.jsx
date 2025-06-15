// Components
import Header from "@/pages/payments/components/Header";
import PaymentsList from "@/pages/payments/components/PaymentsList";

const Payments = () => {
  return (
    <div className="size-full border-l">
      <Header />
      <PaymentsList />
    </div>
  );
};

export default Payments;
