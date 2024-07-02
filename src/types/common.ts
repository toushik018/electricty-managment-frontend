import { USER_ROLE } from "@/constants/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type IMeta = {
    page: number;
    limit: number;
    total: number;
}

export type TUserRole = 'admin' | 'consumer';


export type DrawerItem = {
    title: string;
    path: string;
    icon: React.ElementType;
};





export type ResponseSuccessType = {
    data: any;
    meta?: IMeta[]
}

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessage: IGenericErrorMessage[]
}

export type IGenericErrorMessage = {
    path: string | number;
    message: string
}



