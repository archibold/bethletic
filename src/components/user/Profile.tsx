"use client";

import { useEffect, useState } from "react";
import Button from "@/components/basic/button";
import Input from "@/components/basic/input";
import { useFormState, useFormStatus } from "react-dom";
import { changeUserInfo } from "@/lib/actions/user";

function UserProfileEdit({ name, email }: { name: string; email: string }) {
    const { pending } = useFormStatus();
    return (
        <>
            <h3>Name</h3>
            <div className="col-span-2">
                <Input name="name" defaultValue={name} />
            </div>

            <h3>Email</h3>
            <div className="col-span-2">
                <Input name="email" defaultValue={email} />
            </div>
            <Button type="submit" disabled={pending}>
                Save
            </Button>
        </>
    );
}
export default function UserProfile({
    name,
    email,
}: {
    name: string;
    email: string;
}) {
    const [isEditable, setIsEditable] = useState(false);
    const [formState, dispatch] = useFormState(changeUserInfo, {
        success: false,
    });
    useEffect(() => {
        setIsEditable(false);
    }, [formState.success]);
    return (
        <div>
            <div className="grid lg:grid-cols-3 gap-2">
                {isEditable && (
                    <form action={dispatch}>
                        <UserProfileEdit name={name} email={email} />
                    </form>
                )}
                {!isEditable && (
                    <div>
                        <h3>Name</h3>
                        <div className="col-span-2">{name}</div>

                        <h3>Email</h3>
                        <div className="col-span-2">{email}</div>
                        <Button warning>Delete Account</Button>
                        <Button
                            onClick={(e) => {
                                setIsEditable(true);
                            }}
                        >
                            Change your info
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
