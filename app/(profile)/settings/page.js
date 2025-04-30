import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import SettingsForm from "./SettingsForm";

export const metadata = {
  title: "Settings - FVAI Business",
};

export default async function Settings() {
  const session = await getServerSession(authOptions);

  return (
    <div className="py-8 lg:py-16">
      <SettingsForm session={session} />
    </div>
  );
}
