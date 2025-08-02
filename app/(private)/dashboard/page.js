import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Typography from "@/Components/UI/Typography";
import { getServerSession } from "next-auth/next";
import Actions from "./Actions";
import Conversation from "./Conversation";
import ConversationList from "./ConversationList";

export const metadata = {
  title: "Dashboard - FVAI Business",
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role ?? 0;
  console.log(role);

  return (
    <div className="pt-14">
      <div className="container">
        <div className="px-6 flex items-center justify-between mb-6">
          <Typography size="h5" className="font-semibold">
            My Dashboard
          </Typography>
          {role === 0 && <Actions />}
        </div>

        <div className="bg-[#F5F7FD] border-[1px] border-input-field rounded-tl-[20px] rounded-tr-[20px]">
          <div className="flex">
            <div className="flex-1 max-w-[315px]">
              <ConversationList />
            </div>
            <div className="flex-1 border-l-[1px] border-input-field">
              <Conversation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
