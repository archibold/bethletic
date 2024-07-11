import UserNav from "@/components/user/UserNav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <UserNav></UserNav>
            <div>{children}</div>
        </div>
    );
}
