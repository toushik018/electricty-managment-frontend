export interface Request {
    id: string;
    userId: string;
    flatId: string;
    moveInDate: string;
    lengthOfStay: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
    updatedAt: string;
}

export interface IConsumer {
    id: string;
    username: string;
    email: string;
    password: string;
    contactNumber: string;
    role: "consumer";
}


export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

export enum UserStatus {
    ACTIVATE = "ACTIVATE",
    DEACTIVATE = "DEACTIVATE"
}