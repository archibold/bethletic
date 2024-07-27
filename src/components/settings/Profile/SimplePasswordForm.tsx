"use client";

import { FormEvent, useEffect, useState } from "react";
import Button from "@/components/basic/button";
import Input from "@/components/basic/input";
import FormMessage from "@/components/basic/formMessage";

export function SimplePasswordForm({
    action,
    message,
}: {
    action: string | ((formData: FormData) => void) | undefined;
    message: { success?: string; error?: string } | undefined;
}) {
    const [isPending, setIsPending] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const edit = () => {
        setIsEdit(true);
    };
    const save = (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const data = formData.get("pasword");

        if (data === "") {
            event.preventDefault();
            return false;
        }

        setIsEdit(false);
        setIsPending(true);
        return true;
    };

    const cancel = () => {
        setIsEdit(false);
    };

    useEffect(() => {
        setIsPending(false);
    }, [message]);

    return (
        <div>
            <FormMessage message={message} />
            {!isEdit && (
                <div className="grid lg:grid-cols-5">
                    <h3>Password</h3>
                    <div>***</div>
                    <Button
                        disabled={isPending}
                        className="lg:col-start-5"
                        onClick={edit}
                    >
                        Change password
                    </Button>
                </div>
            )}
            {isEdit && (
                <form action={action} onSubmit={save}>
                    <div className="grid lg:grid-cols-5">
                        <h3>Password</h3>
                        <Input
                            name="password"
                            placeholder="Type new password..."
                            type="password"
                        />
                        <Input
                            name="confirm-password"
                            placeholder="Confirm new password"
                            type="password"
                        />
                        <Button
                            className="lg:col-start-4 grid-cols-1"
                            type="submit"
                        >
                            Save
                        </Button>
                        <Button onClick={cancel}>Cancel</Button>
                    </div>
                </form>
            )}
        </div>
    );
}
