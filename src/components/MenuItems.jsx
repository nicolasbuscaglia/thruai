import {
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItems = ({ menuItems = [] }) => {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <List>
      {menuItems.map((menu, index) => {
        return (
          <Link key={index} href={menu.path}>
            <ListItem disablePadding sx={{ display: "block" }}>
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
                    color: pathname.startsWith(menu.path)
                      ? theme.palette.secondary.main
                      : theme.palette.gray.light,
                  }}
                >
                  <Badge badgeContent={menu.notifications} color="blue">
                    {menu.icon}
                  </Badge>
                </ListItemIcon>
                <ListItemText
                  primary={menu.title}
                  sx={{
                    color: pathname.startsWith(menu.path)
                      ? theme.palette.secondary.main
                      : theme.palette.gray.light,
                  }}
                  primaryTypographyProps={{
                    fontSize: 12,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
};

export { MenuItems };
