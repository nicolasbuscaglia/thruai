"use client";
import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const openedMixin = (theme, drawerWidth, position) => ({
  position: "absolute",
  top: 0,
  left: position === "left" ? 0 : "inherit",
  right: position === "right" ? 0 : "inherit",
  bottom: 0,
  backgroundColor: theme.palette.primary.main,
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme, position, hidden) => ({
  position: "absolute",
  top: 0,
  left: position === "left" ? 0 : "inherit",
  right: position === "right" ? 0 : "inherit",
  bottom: 0,
  backgroundColor: theme.palette.primary.main,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: hidden ? 0 : `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: hidden ? 0 : `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) =>
    prop !== "open" &&
    prop !== "drawerWidth" &&
    prop !== "position" &&
    prop !== "hidden",
})(({ theme, open, drawerWidth, position, hidden }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme, drawerWidth, position),
    "& .MuiDrawer-paper": openedMixin(theme, drawerWidth, position),
  }),
  ...(!open && {
    ...closedMixin(theme, position, hidden),
    "& .MuiDrawer-paper": closedMixin(theme, position, hidden),
  }),
}));

const Sidebar = ({
  children,
  drawerWidth = 180,
  position = "left",
  header = true,
  hidden = false,
  openSidebar = false,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(openSidebar);

  useEffect(() => setOpen(openSidebar), [openSidebar]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={open}
        drawerWidth={drawerWidth}
        position={position}
        hidden={hidden}
      >
        {header && (
          <>
            <DrawerHeader>
              <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                {open ? (
                  <ChevronLeftIcon color="icon" />
                ) : (
                  <ChevronRightIcon color="icon" />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider sx={{ backgroundColor: theme.palette.gray.light }} />
          </>
        )}
        {children}
      </Drawer>
    </Box>
  );
};

export { Sidebar };
