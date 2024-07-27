"use client";

import { useState } from "react";
import Button from "@/components/basic/button";
import { useFormState } from "react-dom";
import {
    changeName,
    changeEmail,
    changePassword,
    deleteUser,
} from "@/lib/actions/user";
import { SimpleForm } from "./Profile/SimpleForm";
import { SimplePasswordForm } from "./Profile/SimplePasswordForm";
import { DeleteModal } from "./Profile/DeleteModal";

export default function UserProfile({
    name,
    email,
}: {
    name: string;
    email: string;
}) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [messageChangeName, dispatchChangeName] = useFormState(
        changeName,
        undefined
    );
    const [messageChangeEmail, dispatchChangeEmail] = useFormState(
        changeEmail,
        undefined
    );
    const [messageChangechangePassword, dispatchChangechangePassword] =
        useFormState(changePassword, undefined);
    const [messageDeleteUser, dispatchDeleteUser] = useFormState(
        deleteUser,
        undefined
    );

    return (
        <div>
            <SimpleForm
                title="Name"
                value={name}
                action={dispatchChangeName}
                message={messageChangeName}
            />
            <SimpleForm
                title="Email"
                value={email}
                action={dispatchChangeEmail}
                message={messageChangeEmail}
            />
            <SimplePasswordForm
                action={dispatchChangechangePassword}
                message={messageChangechangePassword}
            />
            <div className="grid lg:grid-cols-5">
                <Button
                    warning
                    className="lg:col-start-5 grid-cols-1"
                    onClick={() => setIsDeleteModalOpen(true)}
                >
                    Delete Account
                </Button>
            </div>
            <DeleteModal
                isModalOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                }}
                action={dispatchDeleteUser}
            />
        </div>
    );
}
