// Components
import Icon from "../../../components/Icon";
import Searchbox from "../../../components/form/Searchbox";

const Header = () => {
  return (
    <header className="w-full h-16 bg-white border-b">
      <div className="flex items-center justify-between size-full px-5">
        <h1 className="text-2xl font-medium">Pasportlar</h1>

        {/* Searchbox */}
        <Searchbox />

        {/* Profile */}
        <div className="flex items-center gap-3.5">
          <Icon
            size={44}
            alt="Profil rasm"
            className="shrink-0 size-11 object-cover rounded-full"
            src="https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
          />

          <div className="">
            <b className="font-semibold">Yaxyobek</b>
            <p className="text-neutral-500">pubgn9642@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
