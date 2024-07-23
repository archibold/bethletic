"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/lib/actions/auth/newVerification";
import Link from "next/link";
import FormMessage from "@/components/basic/formMessage";

export default function NewVerificationForm() {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        if (success || error) return;

        if (!token) {
            setError("Missing token!");
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Something went wrong!");
            });
    }, [token, success, error]);

    return (
        <div>
            <h1>Confirm your verification</h1>
            {!success && !error && <div>Loading...</div>}
            {success && (
                <div>
                    <FormMessage message={{ success }}></FormMessage>
                    <Link className="text-right" href="/login">
                        Back to login page
                    </Link>
                </div>
            )}
            {error && <FormMessage message={{ error }}></FormMessage>}
        </div>
    );
}
