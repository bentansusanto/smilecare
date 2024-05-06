import { ReactNode } from "react";

export interface PageProps {
    children: ReactNode;
}

export type NavProps = {
    page: string;
    link: string;
}

export type ServiceProps = {
    title: string;
    description: string;
    icon: string;
}

export type HomeProps = {
    heading: string;
    content? : string;
}

export interface HeroProps extends HomeProps {
    services: ServiceProps[]
}