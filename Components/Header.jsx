import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import SiteMenu from "./Menu/SiteMenu";
import UserMenu from "./Menu/UserMenu";

const Header = async () => {
  const session = await getServerSession(authOptions);
  const showSiteMenu = !session || session.user.role === 0;

  return (
    <header className="relative z-20 bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.06)]">
      <div className="container h-[70px] flex gap-6 items-center">
        <div className={`lg:order-2 lg:flex-1 flex items-center ${!showSiteMenu && "hidden lg:flex"}`}>
          {showSiteMenu && <SiteMenu session={session} />}
        </div>
        <div className="lg:order-1 flex-1 lg:flex-initial">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={100} height={24} className="lg:hidden" />
            <Image src="/logo-desktop.png" alt="logo" width={186} height={45} className="hidden lg:block" />
          </Link>
        </div>

        <div className="lg:order-3 lg:relative">{session && <UserMenu session={session} />}</div>
      </div>
    </header>
  );
};

export default Header;
