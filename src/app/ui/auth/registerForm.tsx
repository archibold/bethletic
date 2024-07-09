"use client";

import Input from "@/app/ui/basic/input";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { register } from "@/app/lib/actions";

export default function LoginForm() {
    const { pending } = useFormStatus();
    const [errorMessage, dispatch] = useFormState(register, undefined);

    return (
        <form action={dispatch}>
            <div className="border-2 border-black flex flex-col p-10 gap-5 justify-end">
                <div className="whitespace-pre-line">{errorMessage}</div>
                <Input autoFocus name="name" placeholder="type your name... " />
                <Input autoFocus name="email" placeholder="type email... " />
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
                <Link className="text-right" href="/auth/login">
                    <small>back to login page</small>
                </Link>
            </div>
        </form>
    );
}
