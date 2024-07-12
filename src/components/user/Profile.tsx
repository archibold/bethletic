"use client";

import { useEffect, useState } from "react";
import Button from "@/components/basic/button";
import Input from "@/components/basic/input";
import { useFormState, useFormStatus } from "react-dom";
import { changeUserInfo } from "@/lib/actions/user";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useSession } from "next-auth/react";

export default function UserProfile({
    name,
    email,
}: {
    name: string;
    email: string;
}) {
    const user = useCurrentUser();
    // const user = session.data?.user;
    const [isEditable, setIsEditable] = useState(false);
    const { data: session, update } = useSession();
    const { pending } = useFormStatus();
    const [errorMessage, dispatch] = useFormState(changeUserInfo, undefined);
    useEffect(() => {
        console.log("something changed");
    }, [session]);

    // const onSave = () => {
    //     // setIsEditable(false);
    //     update();
    // };
    return (
        <div>
            <div className="grid lg:grid-cols-3 gap-2">
                <form action={dispatch}>
                    <h3>Name</h3>
                    <div className="col-span-2">
                        {!isEditable ? (
                            <p className="p-1"> {user?.name}</p>
                        ) : (
                            <Input name="name" defaultValue={name} />
                        )}
                    </div>

                    <h3>Email</h3>
                    <div className="col-span-2">
                        {!isEditable ? (
                            <p className="p-1"> {user?.email}</p>
                        ) : (
                            <Input name="email" defaultValue={email} />
                        )}
                    </div>
                    {!isEditable ? (
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsEditable(true);
                            }}
                        >
                            Change your info
                        </Button>
                    ) : (
                        <Button type="submit">Save</Button>
                    )}
                </form>
            </div>

            <div>{!isEditable && <Button warning>Delete Account</Button>}</div>
        </div>
    );
}
