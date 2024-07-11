"use client";

import { useState } from "react";
import Button from "@/components/basic/button";
import Input from "@/components/basic/input";
import { useFormState, useFormStatus } from "react-dom";
import { changeUserInfo } from "@/lib/actions/user";
import { useSession } from "next-auth/react";

export default function UserProfile({
    name,
    email,
}: {
    name: string;
    email: string;
}) {
    const { update } = useSession();
    const [isEditable, setIsEditable] = useState(false);
    const { pending } = useFormStatus();
    const [errorMessage, dispatch] = useFormState(changeUserInfo, undefined);

    const onSave = () => {
        // setIsEditable(false);
        update();
    };
    return (
        <div>
            <div className="grid lg:grid-cols-3 gap-2">
                <form action={dispatch}>
                    <h3>Name</h3>
                    <div className="col-span-2">
                        {!isEditable ? (
                            <p className="p-1"> {name}</p>
                        ) : (
                            <Input name="name" defaultValue={name} />
                        )}
                    </div>

                    <h3>Email</h3>
                    <div className="col-span-2">
                        {!isEditable ? (
                            <p className="p-1"> {email}</p>
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
                        <Button type="submit" onClick={onSave}>
                            Save
                        </Button>
                    )}
                </form>
            </div>

            <div>{!isEditable && <Button warning>Delete Account</Button>}</div>
        </div>
    );
}
