"use client";

import Typography from "@/Components/Typography";
import Box from "@/Components/UI/Box";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";

const SettingsForm = ({ session }) => {
  const { user } = session;

  return (
    <div className="container lg:max-w-[767px] lg:max-auto">
      <Box p="6" className="mb-6">
        <Typography size="h5" className="mb-6">
          My Basic information
        </Typography>
        <Input label="E-mail" value={user.email} disabled className="mb-6" />
      </Box>

      {user.hasPassword && (
        <Box p="6" className="mb-6">
          <Typography size="h5" className="mb-6">
            Change Password
          </Typography>
          <Input label="Old Password" type="password" placeholder="Type password" className="mb-6" />
          <Input label="New Password" type="password" placeholder="Type new password" className="mb-6" />
          <Input label="Confirm New Password" type="password" placeholder="Confirm new password" className="mb-6" />
          <Button>Save</Button>
        </Box>
      )}

      <Box p="6" className="mb-6">
        <Typography size="h5" className="mb-6">
          Your account
        </Typography>
        <button className="text-left text-red font-semibold">Delete my account</button>
      </Box>
    </div>
  );
};

export default SettingsForm;
