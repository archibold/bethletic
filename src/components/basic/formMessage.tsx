import clsx from "clsx";

export default function FormMessage({
    message,
}: {
    message: { error?: string; success?: string } | undefined;
}) {
    return (
        <div
            className={clsx(
                "whitespace-pre-line",
                message?.error ? " text-red-500" : "",
                message?.success ? " text-green-500" : ""
            )}
        >
            {message?.error && <p>{message?.error}</p>}
            {message?.success && <p>{message?.success}</p>}
        </div>
    );
}
