"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/basic/button";
import Input from "@/components/basic/input";
import Modal from "@/components/basic/modal";
import FormMessage from "@/components/basic/formMessage";
import { useSearchParams } from "next/navigation";

export function DeleteModal({
    isModalOpen,
    action,
    onClose,
}: {
    action: string | ((formData: FormData) => void) | undefined;
    isModalOpen: boolean;
    onClose: () => void;
}) {
    const [error, setError] = useState<string>();
    const validateModal = (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const confirmDelete = formData.get("confirm-delete");
        if (confirmDelete !== "DELETE") {
            event.preventDefault();
            setError("type DELETE capital letter");
        }
    };
    return (
        <Modal isOpen={isModalOpen} onClose={onClose}>
            <form action={action} onSubmit={validateModal}>
                <FormMessage message={{ error }} />
                <div className="flex flex-col lg:w-96">
                    <p>
                        You want to delete you Account. You lose all your data
                        and won&apos;t get it back. If you really want to delete
                        your account type DELETE
                    </p>
                    <Input
                        name="confirm-delete"
                        placeholder="type DELETE to remove account"
                    ></Input>
                    <Button warning type="submit">
                        Delete
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
