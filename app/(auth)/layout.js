import AuthHeader from "@/Components/AuthHeader";

export default function AuthLayout({ children }) {
  return (
    <>
      <AuthHeader />
      <main>{children}</main>
    </>
  );
}
