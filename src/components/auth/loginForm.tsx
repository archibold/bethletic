"use client";

import Input from "@/components/basic/input";
import Button from "@/components/basic/button";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions/auth";

export default function LoginForm() {
    const { pending } = useFormStatus();
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <div className="border-2 border-black flex flex-col p-10 gap-5 justify-end">
            <form action={dispatch}>
                <div className="flex flex-col gap-5">
                    <div className="whitespace-pre-line">{errorMessage}</div>
                    <Input
                        autoFocus
                        disabled={pending}
                        name="email"
                        placeholder="type email... "
                    />
                    <Input
                        name="password"
                        disabled={pending}
                        placeholder="type password"
                        type="password"
                    />
                    <Button disabled={pending} className="text-right">
                        Login
                    </Button>
                </div>
            </form>
            <div className="flex gap-5 justify-between">
                <Button disabled={pending}>Google</Button>
                <Button disabled={pending}>Facebook</Button>
            </div>
            <Link className="text-right" href="/register">
                <small>Register new user</small>
            </Link>
        </div>
    );
}
