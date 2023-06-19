"use client";
import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawerMixin = (theme, position, direction) => ({
  position: position,
  top: 0,
  left: direction === "left" ? 0 : "inherit",
  right: direction === "right" ? 0 : "inherit",
  bottom: 0,
  backgroundColor: theme.palette.primary.main,
  overflowX: "hidden",
  border: "1px solid",
  borderColor: theme.palette.lightGray.dark,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
});

const openedMixin = (theme, drawerWidth) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme, hidden) => ({
  width: hidden ? 0 : `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: hidden ? 0 : `calc(${theme.spacing(8)} + 1px)`,
  },
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

const DrawerHeader = styled("div", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "direction",
})(({ theme, direction, open }) => ({
  display: "flex",
  flexDirection: direction === "left" ? "row" : "row-reverse",
  alignItems: "center",
  justifyContent: open
    ? direction === "left"
      ? "flex-end"
      : "flex-start"
    : "center",
  padding: theme.spacing(0, 1),
  borderBottom: "1px solid",
  borderBottomColor: theme.palette.lightGray.dark,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) =>
    prop !== "open" &&
    prop !== "drawerWidth" &&
    prop !== "position" &&
    prop !== "direction" &&
    prop !== "hidden",
})(({ theme, open, drawerWidth, position, direction, hidden }) => ({
  ...drawerMixin(theme, position, direction),
  ...(open && {
    ...openedMixin(theme, drawerWidth),
    "& .MuiDrawer-paper": {
      ...drawerMixin(theme, position, direction),
      ...openedMixin(theme, drawerWidth),
    },
  }),
  ...(!open && {
    ...closedMixin(theme, hidden),
    "& .MuiDrawer-paper": {
      ...drawerMixin(theme, position, direction),
      ...closedMixin(theme, hidden),
    },
  }),
}));

const StyledStickyBox = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: 0,
  backgroundColor: theme.palette.primary.main,
  zIndex: 1,
}));

const Sidebar = ({
  children,
  openSidebar = false,
  position = "absolute",
  direction = "left",
  drawerWidth = 180,
  header = true,
  headerComponent,
  hidden = false,
}) => {
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
        direction={direction}
        hidden={hidden}
      >
        {header && (
          <StyledStickyBox>
            <DrawerHeader open={open} direction={direction}>
              {headerComponent && (
                <Box sx={{ display: open ? "block" : "none", width: "100%" }}>
                  {headerComponent}
                </Box>
              )}
              <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                {open ? (
                  direction === "left" ? (
                    <ChevronLeftIcon color="icon" />
                  ) : (
                    <ChevronRightIcon color="icon" />
                  )
                ) : direction === "left" ? (
                  <ChevronRightIcon color="icon" />
                ) : (
                  <ChevronLeftIcon color="icon" />
                )}
              </IconButton>
            </DrawerHeader>
          </StyledStickyBox>
        )}
        <Box sx={{ display: "flex", flex: 1, minWidth: drawerWidth }}>
          {children}
        </Box>
      </Drawer>
    </Box>
  );
};

export { Sidebar };
