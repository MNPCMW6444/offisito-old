import { useContext, useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Container,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NotificationsTab } from "./NotificationsTab";
import { AccountTab } from "./AccountTab";
import { Logout, Notifications } from "@mui/icons-material";
import { AuthContext } from "../../../";

export const SettingPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { user, profilePictureUrl, logout } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const menuData = [
    {
      name: "Manage Account",
      icon: (
        <Avatar alt={user?.name || "username"} src={profilePictureUrl}>
          {user?.name ? user?.name[0] : "?"}
        </Avatar>
      ),
      content: <AccountTab />,
      disabled: false,
    },
    {
      name: "Notifications",
      icon: <Notifications />,
      content: <NotificationsTab />,
      disabled: false,
    },
    {
      name: "Logout",
      icon: <Logout />,
      action: logout,
      disabled: false,
    },
  ];

  const handleTabChange = (_: any, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (menuData[activeTab].action) {
      (menuData[activeTab].action as Function)();
    }
  }, [activeTab]);

  return (
    <Container>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons={isMobile ? "auto" : false}
        allowScrollButtonsMobile
      >
        {menuData.map((item, index) => (
          <Tab
            key={index}
            label={item.name}
            icon={item.icon}
            iconPosition="start"
            disabled={item.disabled}
          />
        ))}
      </Tabs>
      <br />
      <br />
      <br />
      {menuData[activeTab].content}
    </Container>
  );
};
