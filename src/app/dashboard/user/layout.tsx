import UserNav from "../../ui/user/UserNav";
export default function Layout({ children }: { children: React.ReactNode }) {
    <div>
        <UserNav></UserNav>
        <div>{children}</div>
    </div>;
}
