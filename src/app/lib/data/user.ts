import { sql } from "@vercel/postgres";
import { User } from "../definitions";
import { auth } from "../../../auth";

export async function getUserData() {
    const session = await auth();

    try {
        if (!session?.user) throw new Error();
        console.log(session.user);
        const data = await sql<User>`
        `;
        // const actualUser;
    } catch (e) {
        throw new Error("Cannot load user data");
    }
}
