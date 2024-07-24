export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen h-screen items-center justify-center flex">
            {children}
        </div>
    );
}
