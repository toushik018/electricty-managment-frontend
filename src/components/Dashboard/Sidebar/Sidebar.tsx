import { Box, List, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { TUserRole } from "@/types";
import { getUserInfo } from "@/services/auth.service";
import { useEffect, useState } from "react";
import { drawerItems } from "@/utils/drawerItems";
import SidebarItem from "./SidebarItem";

const SideBar = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const user = getUserInfo() as any;
    setUserRole(user?.role);
  }, []);

  return (
    <div>
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={1}
          py={1}
          mt={2}
          component={Link}
          href="/"
        >
          <Typography
            variant="h5"
            component="h1"
            fontWeight={800}
            sx={{ textTransform: "uppercase" }}
          >
            EM
          </Typography>
        </Stack>
        <List>
          {drawerItems(userRole as TUserRole).map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </List>
      </Box>
    </div>
  );
};

export default SideBar;
