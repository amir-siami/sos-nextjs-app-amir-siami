import Navigation from "@/app/_components/navigation/Navigation";
import Logo from "@/app/_components/logo/Logo";

function Header() {
  return (
    <header className="shadow-md shadow-neutral-400 border-primary-900 px-8 py-5 min-h-[85px] z-10">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
