import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authProvider } from "src/authProvider";

async function checkAuth(authCokkie: string | undefined) {
    return await authProvider.check(authCokkie);
}

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = cookies();
    const auth = cookieStore.get("auth");

    const { authenticated } = await checkAuth(auth?.value);

    if (authenticated) {
        return redirect("/");
    } else {
        return children;
    }
}
