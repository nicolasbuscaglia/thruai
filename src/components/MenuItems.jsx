import { selectIsAuthenticated } from "@/redux/features/uiSlice";
import {
  Badge,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const MenuItems = ({ menuItems = [] }) => {
  const pathname = usePathname();
  const theme = useTheme();
  const isAuthenticated = useSelector((state) => selectIsAuthenticated(state));

  return (
    <List>
      {menuItems.map((menu, index) => {
        return isAuthenticated ? (
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
        ) : (
          <Box mt={2} mb={2} ml={2} key={index}>
            <Skeleton
              variant="circular"
              width={30}
              height={30}
              sx={{
                backgroundColor: theme.palette.border.main,
              }}
            />
          </Box>
        );
      })}
    </List>
  );
};

export { MenuItems };
