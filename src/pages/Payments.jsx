import PaymentsList from "@/components/PaymentsList";
import PaymentsPageHeader from "@/components/PaymentsPageHeader";

const Payments = () => {
  return (
    <div className="size-full border-l">
      <PaymentsPageHeader />
      <PaymentsList />
    </div>
  );
};

export default Payments;
