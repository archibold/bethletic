import { auth } from "@/auth";
import UserProfile from "@/components/user/Profile";

export default async function Page() {
    const session = await auth();
    return (
        <UserProfile
            name={session?.user?.name || ""}
            email={session?.user?.email || ""}
        />
    );
}
