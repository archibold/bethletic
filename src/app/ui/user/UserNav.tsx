import Link from "next/link";

export default function UserNav() {
    return (
        <div>
            <Link href="/dashboard/user/favorite">Favorite</Link>
            <Link href="/dashboard/user/profile">Profile</Link>
        </div>
    );
}
