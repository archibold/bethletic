import NewPasswordForm from "@/components/auth/newPasswordForm";
import { Suspense } from "react";

const NewPasswordPage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <NewPasswordForm />
            </Suspense>
        </div>
    );
};

export default NewPasswordPage;
