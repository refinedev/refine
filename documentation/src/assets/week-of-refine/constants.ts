import { CardProps } from "@site/src/pages/week-of-refine";
import { StrapiWithTextXL, SupabaseWithTextXL } from "./icons";

export const weekOfRefineCards: CardProps[] = [
    {
        title: "Invoicer",
        imgURL: "https://refine.ams3.cdn.digitaloceanspaces.com/week-of-refine/week-of-refine-invoicer.png",
        dateRange: "April 10 - April 14, 2023",
        description:
            "Stay tuned all week and learn the basics of creating a CRUD app via refine & Strapi on a fun project in a week.",
        logo: StrapiWithTextXL,
        bgLinearGradient:
            "bg-week-of-refine-strapi-card-light dark:bg-week-of-refine-strapi-card",
        link: "/week-of-refine-strapi",
    },
    {
        title: "Pixels!",
        imgURL: "https://refine.ams3.cdn.digitaloceanspaces.com/week-of-refine/week-of-refine-pixels.png",
        dateRange: "February 14 - February 20, 2023",
        description:
            "Stay tuned all week and learn the basics of creating a CRUD app via refine & Strapi on a fun project in a week.",
        logo: SupabaseWithTextXL,
        bgLinearGradient:
            "bg-week-of-refine-supabase-card-light dark:bg-week-of-refine-supabase-card",
        link: "/week-of-refine-supabase",
    },
];
