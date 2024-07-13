"use client";

import Input from "@/components/basic/input";
import Button from "@/components/basic/button";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { register } from "@/lib/actions/auth";

export default function LoginForm() {
    const { pending } = useFormStatus();
    const [errorMessage, dispatch] = useFormState(register, undefined);

    return (
        <div className="border-2 border-black flex flex-col p-10 gap-5 justify-end">
            <form action={dispatch}>
                <div className="flex flex-col gap-5">
                    <div className="whitespace-pre-line">{errorMessage}</div>
                    <Input
                        autoFocus
                        name="name"
                        placeholder="type your name... "
                    />
                    <Input
                        autoFocus
                        name="email"
                        placeholder="type email... "
                    />
                    <Input
                        name="password"
                        placeholder="type password"
                        type="password"
                    />
                    <Input
                        name="confirm-password"
                        placeholder="type the same password"
                        type="password"
                    />
                    <button disabled={pending} className="text-right">
                        Register
                    </button>
                </div>
            </form>
            <div className="flex gap-5 justify-between">
                <Button disabled={pending}>Google</Button>
                <Button disabled={pending}>Facebook</Button>
            </div>
            <Link className="text-right" href="/auth/login">
                <small>back to login page</small>
            </Link>
        </div>
    );
}
