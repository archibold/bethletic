import type { Metadata } from "next";
import { inter } from "@/app/ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
    title: "Bethletic",
    description: "Exercise monitor app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
