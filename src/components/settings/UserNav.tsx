import Link from "next/link";

export default function UserNav() {
    return (
        <div>
            {/* <Link href="/dashboard/user/favorite">Favorite</Link> */}
            <Link href="/dashboard/settings/profile">Profile</Link>
        </div>
    );
}
