import Link from "next/link";

export default function UserNav() {
    return (
        <div>
            <Link href="/user/favorite">Favorite</Link>
            <Link href="/user/profile">Profile</Link>
        </div>
    );
}
