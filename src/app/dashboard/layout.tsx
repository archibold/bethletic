import SideNav from "@/components/dashboard/sidenav/sidenav";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-64">
                    <SideNav />
                </div>
                <div className="flex-grow p-6 md:overflow-y-auto bg-gray-50">
                    {children}
                </div>
            </div>
        </SessionProvider>
    );
}
