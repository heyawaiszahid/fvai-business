import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import SiteMenu from "./Menu/SiteMenu";
import UserMenu from "./Menu/UserMenu";
import Button from "./UI/Button";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="lg:hidden">
        <header className="relative z-20 bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.06)]">
          <div className="container py-5 flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <SiteMenu session={session} />
              <Link href="/">
                <Image src="/logo.png" alt="logo" width={100} height={24} />
              </Link>
            </div>
            {session && <UserMenu session={session} />}
          </div>
        </header>
      </div>

      <div className="hidden lg:block">
        <header className="relative z-20 bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.06)]">
          <div className="container py-2 flex items-center justify-between">
            <Link href="/">
              <Image src="/logo-desktop.png" alt="logo" width={186} height={44.96} />
            </Link>
            {!session ? (
              <div className="flex gap-6">
                <Button href="/questionnaire">Start Your Valuation</Button>
                <Button href="/join-free-course" variant="outline">
                  Join Free Course
                </Button>
              </div>
            ) : (
              <div className="flex gap-6 relative">
                <Button href="/questionnaire">Start Valuation</Button>
                <Button href="/dashboard" variant="outline">
                  My Dashboard
                </Button>
                <UserMenu session={session} />
              </div>
            )}
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
