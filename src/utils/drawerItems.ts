import { USER_ROLE } from "@/constants/role";
import { DrawerItem, TUserRole } from "@/types";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyIcon from "@mui/icons-material/Key";
import ReceiptIcon from "@mui/icons-material/Receipt";

export const drawerItems = (role: TUserRole) => {
    const roleMenus: DrawerItem[] = [];
    const defaultMenus = [
        {
            title: "Profile",
            path: `${role}/profile`,
            icon: PersonOutlineIcon,
        },
        {
            title: "Change Password",
            path: "change-password",
            icon: KeyIcon,
        },
    ];

    switch (role) {
        case USER_ROLE.ADMIN:
            roleMenus.push(
                {
                    title: "Dashboard",
                    path: `${role}`,
                    icon: DashboardIcon,
                },
                {
                    title: "Manage Consumers",
                    path: `${role}/manage-consumers`,
                    icon: GroupIcon,
                },
                {
                    title: "Manage Bills",
                    path: `${role}/manage-bills`,
                    icon: ReceiptIcon,
                },
                {
                    title: "Create a Consumer",
                    path: `${role}/create-consumer`,
                    icon: ReceiptIcon,
                },
            );
            break;

        case USER_ROLE.CONSUMER:
            roleMenus.push(
                {
                    title: "Dashboard",
                    path: `${role}`,
                    icon: DashboardIcon,
                },
                {
                    title: "View Bills",
                    path: `${role}/view-bills`,
                    icon: ReceiptIcon,
                }
            );
            break;

        default:
            break;
    }

    return [...roleMenus, ...defaultMenus];
};
