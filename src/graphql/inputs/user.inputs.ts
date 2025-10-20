import { Role } from "@prisma/client";

export interface RegisterArgs {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export interface LoginArgs {
  email: string;
  password: string;
}