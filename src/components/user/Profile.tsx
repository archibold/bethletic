"use client";

import { FormEvent, startTransition, useEffect, useState } from "react";
import Button from "@/components/basic/button";
import Input from "@/components/basic/input";
import { useFormState, useFormStatus } from "react-dom";
import { changeUserInfo } from "@/lib/actions/user";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useSession } from "next-auth/react";

const Form = ({ name, email }: { name: string; email: string }) => {
    const [isEditable, setIsEditable] = useState(false);
    const { data: session, update } = useSession();
    const { pending } = useFormStatus();
    // useEffect(() => {
    //     // if (!pending) {
    //     //     update();
    //     // }
    //     console.log(pending);
    // }, [pending]);
    return (
        <>
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
                <Button type="submit" disabled={pending}>
                    Save
                </Button>
            )}
        </>
    );
};

export default function UserProfile({
    name,
    email,
}: {
    name: string;
    email: string;
}) {
    const user = useCurrentUser();
    // const user = session.data?.user;
    // console.log(session);
    const { data: session, update } = useSession();
    // const A = useFormStatus();
    // const [errorMessage, dispatch] = useFormState(changeUserInfo, undefined);
    // useEffect(() => {
    //     console.log("something changed");
    //     console.log(A);
    // }, [A]);
    // console.log(session);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("SUPER MOCE");
        const formData = new FormData(event.currentTarget);
        startTransition(() => {
            console.log("WUJO");
            changeUserInfo(undefined, formData).then(() => {
                console.log("HEJ");
                update();
            });
        });
    };
    return (
        <div>
            <div className="grid lg:grid-cols-3 gap-2">
                <form onSubmit={onSubmit}>
                    <Form name={user?.name || ""} email={user?.email || ""} />
                </form>
            </div>

            {/* <div>{!isEditable && <Button warning>Delete Account</Button>}</div> */}
        </div>
    );
}
