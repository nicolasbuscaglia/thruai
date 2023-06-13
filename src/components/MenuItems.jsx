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
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
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
