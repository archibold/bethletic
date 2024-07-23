import NewVerificationForm from "@/components/auth/newVerificationForm";
import { Suspense } from "react";

const NewVerificationPage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <NewVerificationForm />
            </Suspense>
        </div>
    );
};

export default NewVerificationPage;
