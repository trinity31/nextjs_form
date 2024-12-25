import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import Button from "@/components/form-btn";

async function getUser() {
    const session = await getSession();
    if (session.id) {
        const user = await db.user.findUnique({
            where: {
                id: session.id,
            },
        });
        return user;
    }
    notFound();
}

export default async function Profile() {
    const user = await getUser();
    const logOut = async () => {
        "use server";
        const session = await getSession();
        await session.destroy();
        redirect("/");
    }
    
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Profile</h1>
                <div className="flex flex-col gap-1">
                    <p className="text-gray-600">Username</p>
                    <p className="font-medium">{user?.username}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium">{user?.email}</p>
                </div>
            </div>
            <form action={logOut}>
                 <Button text="Logout" />
            </form>
        </div>
    );
}
