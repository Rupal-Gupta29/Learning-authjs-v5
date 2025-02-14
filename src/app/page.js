import { auth } from "@/auth";
import LogoutBtn from "@/components/LogoutBtn";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  console.log("Sessions", session);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <Image
        src={session?.user?.image}
        alt="profile-img"
        height={100}
        width={100}
        className="rounded"
      />
      <h1 className="text-2xl font-semibold">Hello! {session?.user?.name}</h1>
      <p className="text-sm text-gray-500">{session?.user?.email}</p>
      <LogoutBtn />
    </div>
  );
}
