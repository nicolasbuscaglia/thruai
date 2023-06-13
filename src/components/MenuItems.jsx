import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { usePathname } from "next/navigation";

const MenuItems = ({ menuItems = [] }) => {
  const pathname = usePathname();
  const theme = useTheme();
  return (
    <List>
      {menuItems.map((menu, index) => {
        return (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color:
                    pathname === menu.pathname
                      ? theme.palette.secondary.main
                      : theme.palette.gray.light,
                }}
              >
                {menu.icon}
              </ListItemIcon>
              <ListItemText
                primary={menu.title}
                sx={{
                  color:
                    pathname === menu.pathname
                      ? theme.palette.secondary.main
                      : theme.palette.gray.light,
                  opacity: open ? 1 : 0,
                }}
                primaryTypographyProps={{
                  fontSize: 12,
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export { MenuItems };
