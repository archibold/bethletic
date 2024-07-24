"use client";

import Input from "@/components/basic/input";
import Button from "@/components/basic/button";
import Link from "next/link";
import { useFormState } from "react-dom";
import { authenticate } from "@/lib/actions/auth/authenticateForm";
import FormMessage from "@/components/basic/formMessage";

export default function LoginForm() {
    const [message, dispatch] = useFormState(authenticate, undefined);

    return (
        <div className="border-2 border-black flex flex-col p-10 gap-5 justify-end">
            <form action={dispatch}>
                <div className="flex flex-col gap-5">
                    <FormMessage message={message} />
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
                    <Button type="submit">Login</Button>
                </div>
            </form>
            {/* <div className="flex gap-5 justify-between">
                <Button>Google</Button>
                <Button>Facebook</Button>
            </div> */}
            <Link className="text-right" href="/reset">
                <small>Forgot password?</small>
            </Link>
            <Link className="text-right" href="/register">
                <small>Register new user</small>
            </Link>
        </div>
    );
}
