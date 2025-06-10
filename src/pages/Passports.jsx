import PassportsList from "@/components/PassportsList";
import PassportsPageHeader from "@/components/PassportsPageHeader";

const Passports = () => {
  return (
    <div className="size-full border-l">
      <PassportsPageHeader />
      <PassportsList />
    </div>
  );
};

export default Passports;
