import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  SvgIcon,
  Tooltip,
} from "@mui/material";
import { AuthContext, PrimaryText } from "@monorepo/shared";
import { MouseEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ReactComponent as Logo } from "../../../../../../libs/shared/src/assets/branded/logo.svg";

const TopBar = () => {
  const { user, logout, profilePictureUrl } = useContext(AuthContext);
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
    { name: "Chats", route: "chats" },
    { name: "Settings", route: "settings" },
    { name: "Logout", route: "logout" },
  ];

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      wrap="nowrap"
    >
      <Grid item>
        <SvgIcon
          component={Logo}
          style={{ color: "green" }}
          viewBox="0 0 600 476.6"
        />
      </Grid>
      <Grid item>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={user?.name || "username"} src={profilePictureUrl}>
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
