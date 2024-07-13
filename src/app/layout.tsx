import type { Metadata } from "next";
import { inter } from "@/app/fonts";
import "./globals.css";
import AuthWrapper from "./auth_wrapper";

export const metadata: Metadata = {
    title: {
        template: "%s | Bethletic Dashboard",
        default: "Bethletic",
    },
    description:
        "The Greatest exercise app with over 1000 different exercises.",
    // metadataBase: new URL("https://url"),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className="overscroll-none" lang="en">
            <AuthWrapper>
                <body className={inter.className}>{children}</body>
            </AuthWrapper>
        </html>
    );
}
