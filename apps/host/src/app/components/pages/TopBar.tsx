import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { PrimaryText } from "@monorepo/react-styles";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const navigate = useNavigate();

  const handleCloseUserMenu = (route: string) => {
    setAnchorElUser(null);
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
    >
      <Grid item>Logo</Grid>
      <Grid item>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
