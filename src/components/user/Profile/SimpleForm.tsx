"use client";

import { FormEvent, useEffect, useState } from "react";
import Button from "@/components/basic/button";
import Input from "@/components/basic/input";
import FormMessage from "@/components/basic/formMessage";

export function SimpleForm({
    title,
    value,
    action,
    message,
}: {
    action: string | ((formData: FormData) => void) | undefined;
    title: string;
    value: string;
    message: { success?: string; error?: string } | undefined;
}) {
    const [isPending, setIsPending] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const edit = () => {
        setIsEdit(true);
    };
    const save = (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const data = formData.get(title.toLocaleLowerCase());

        if (data === value) {
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
    }, [value, message]);
    return (
        <div>
            <FormMessage message={message} />
            {!isEdit && (
                <div className="grid lg:grid-cols-5">
                    <h3>{title}</h3>
                    <div>{value}</div>
                    <Button
                        disabled={isPending}
                        className="lg:col-start-5"
                        onClick={edit}
                    >
                        Change {title.toLocaleLowerCase()}
                    </Button>
                </div>
            )}
            {isEdit && (
                <form action={action} onSubmit={save}>
                    <div className="grid lg:grid-cols-5">
                        <h3>{title}</h3>
                        <Input
                            name={title.toLocaleLowerCase()}
                            defaultValue={value}
                            placeholder={value}
                        />
                        <Button className="lg:col-start-4" type="submit">
                            Save
                        </Button>
                        <Button className="lg:col-1" onClick={cancel}>
                            Cancel
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
