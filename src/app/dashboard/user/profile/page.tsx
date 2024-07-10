import { auth } from "../../../../auth";
import Button from "../../../ui/basic/button";
import Input from "../../../ui/basic/input";

export default async function Page() {
    const session = await auth();
    return (
        <div>
            <div className="grid lg:grid-cols-3">
                <h3>Name</h3>
                <p className="col-span-2"> {session?.user?.name}</p>
                <h3>Email</h3>
                <p className="col-span-2"> {session?.user?.email}</p>
            </div>
            <div>
                <Button onClick={() => {}}>Change your info</Button>
                <Button warning>Delete Account</Button>
            </div>
        </div>
    );
}
