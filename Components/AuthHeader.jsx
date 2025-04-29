import Image from "next/image";
import Link from "next/link";

const AuthHeader = () => {
  return (
    <header className="bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.06)]">
      <div className="container h-[70px] flex justify-center items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={100} height={24} className="lg:hidden" />
          <Image src="/logo-desktop.png" alt="logo" width={186} height={44.96} className="hidden lg:block" />
        </Link>
      </div>
    </header>
  );
};

export default AuthHeader;
