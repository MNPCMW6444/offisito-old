import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { PrimaryText } from "@monorepo/react-styles";
import { MouseEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@monorepo/react-components";

const TopBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const navigate = useNavigate();

  const handleCloseUserMenu = (route: string) => {
    setAnchorElUser(null);
    route === "logout" && logout();
    route && navigate(route);
  };

  const routes = [
    { name: "Dashboard", route: "dashboard" },
    { name: "Profiles", route: "profiles" },
    { name: "Spaces", route: "spaces" },
    { name: "Chats", route: "chat" },
    { name: "Logout", route: "logout" },
  ];

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      wrap="nowrap"
      padding="20px 25px 0 25px"
    >
      <Grid item>Logo</Grid>
      <Grid item>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={user?.name || "username"} src={"imagepath"}>
              {user?.name ? user?.name[0] : "?"}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={() => handleCloseUserMenu("")}
        >
          {routes.map(({ name, route }) => (
            <MenuItem key={route} onClick={() => handleCloseUserMenu(route)}>
              <PrimaryText textAlign="center">{name}</PrimaryText>
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </Grid>
  );
};

export default TopBar;
