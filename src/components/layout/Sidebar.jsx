import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import {
  Pool,
  Home,
  People,
  Menu as MenuIcon,
  Logout,
  AccountCircle,
  NotificationsNone,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import useAuthStore from "../../store/authStore";

const DRAWER_WIDTH = 240;
const DRAWER_WIDTH_COLLAPSED = 65;

const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDesktopOpen(!desktopOpen);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      text: "Inicio",
      icon: <Home />,
      path: "/dashboard",
      roles: ["USER", "ADMIN"],
    },
    {
      text: "Piscinas",
      icon: <Pool />,
      path: "/piscinas",
      roles: ["USER", "ADMIN"],
    },
    { text: "Usuarios", icon: <People />, path: "/users", roles: ["ADMIN"] },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.rol),
  );

  const drawer = (isCollapsed = false) => (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Logo */}
      <Box
        sx={{
          p: isCollapsed ? 2 : 3,
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "flex-start",
          gap: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          minHeight: 64,
        }}
      >
        <Pool sx={{ color: "primary.main", fontSize: 32 }} />
        {!isCollapsed && (
          <Typography variant="h6" fontWeight={600}>
            PoolFlow
          </Typography>
        )}
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, pt: 2, px: 1 }}>
        {filteredMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <Tooltip title={isCollapsed ? item.text : ""} placement="right">
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  px: isCollapsed ? 1 : 2,
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                    "& .MuiListItemIcon-root": {
                      color: "white",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: isCollapsed ? 0 : 40 }}>
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary={item.text} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      {/* User Profile */}
      <Box
        sx={{
          p: isCollapsed ? 1 : 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        {!isCollapsed && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
              {user?.nombre?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight={600} noWrap>
                {user?.nombre}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {user?.rol}
              </Typography>
            </Box>
          </Box>
        )}

        <Tooltip title={isCollapsed ? "Cerrar Sesión" : ""} placement="right">
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 1,
              color: "error.main",
              justifyContent: isCollapsed ? "center" : "flex-start",
              px: isCollapsed ? 1 : 2,
            }}
          >
            <ListItemIcon sx={{ minWidth: isCollapsed ? 0 : 40 }}>
              <Logout sx={{ color: "error.main" }} />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="Cerrar Sesión" />}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );

  const currentDrawerWidth = desktopOpen
    ? DRAWER_WIDTH
    : DRAWER_WIDTH_COLLAPSED;

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: {
            xs: "100%",
            md: `calc(100% - ${currentDrawerWidth}px)`,
          },
          ml: { md: `${currentDrawerWidth}px` },
          backgroundColor: "white",
          color: "text.primary",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1 }}>
            Home / Dashboard
          </Typography>

          <IconButton color="inherit">
            <NotificationsNone />
          </IconButton>

          <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
              {user?.nombre?.charAt(0)?.toUpperCase()}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <AccountCircle sx={{ mr: 1 }} /> Perfil
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <Logout sx={{ mr: 1 }} /> Cerrar Sesión
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{
          width: { md: currentDrawerWidth },
          flexShrink: { md: 0 },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer(false)}
        </Drawer>

        {/* Desktop drawer - permanent con animación */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: currentDrawerWidth,
              overflowX: "hidden",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open
        >
          {drawer(!desktopOpen)}

          {/* Botón de colapsar (solo desktop) */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: "absolute",
              right: -12,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "white",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              width: 24,
              height: 24,
              "&:hover": {
                backgroundColor: "grey.100",
              },
              display: { xs: "none", md: "flex" },
            }}
          >
            {desktopOpen ? (
              <ChevronLeft fontSize="small" />
            ) : (
              <ChevronRight fontSize="small" />
            )}
          </IconButton>
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            xs: "100%",
            md: `calc(100% - ${currentDrawerWidth}px)`,
          },
          mt: 8,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
