// Components
import Header from "@/pages/user-passports/components/Header";
import PassportsList from "@/pages/user-passports/components/PassportsList";

const UserPassports = () => {
  return (
    <div className="size-full border-l">
      <Header />
      <PassportsList />
    </div>
  );
};

export default UserPassports;
