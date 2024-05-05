import { ReactNode } from "react";

export interface PageProps {
    children: ReactNode;
}

export type NavProps = {
    page: string;
    link: string;
}