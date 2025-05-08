import { auth } from "@/auth";
import CafeteriaPage from "./clientPage";
import { Session } from "next-auth";

interface ExtendedSession extends Session {
  user: {
    accessToken: string;
  } & Session["user"];
}

export default async function page() {
  const session = (await auth()) as ExtendedSession;
  if (!session?.user?.accessToken) {
    throw new Error("Unauthorized");
  }

  const cafeteriaRes = await fetch(
    `${process.env.BACKEND_URL}/api/v1/cafeterias/all`,
    {
      next: {
        revalidate: 300,
      },
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    },
  );

  if (!cafeteriaRes.ok) {
    throw new Error(`Failed to fetch cafeterias: ${cafeteriaRes.status}`);
  }

  const cafeterias = await cafeteriaRes.json();

  const cafeteriasWithMenus = [];
  for (const cafeteria of cafeterias) {
    const cafeteriaMenuRes = await fetch(
      `${process.env.BACKEND_URL}/api/v1/cafeterias/${cafeteria.cafeteriaId}/menus`,
      {
        next: {
          revalidate: 300,
        },
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      },
    );
    if (!cafeteriaMenuRes.ok) {
      throw new Error(
        `Failed to fetch cafeteria menu: ${cafeteriaMenuRes.status}`,
      );
    }
    const cafeteriaMenu = await cafeteriaMenuRes.json();
    cafeteriasWithMenus.push({
      ...cafeteria,
      menus: cafeteriaMenu,
    });
  }

  console.log(
    "cafeteriasWithMenus",
    JSON.stringify(cafeteriasWithMenus, null, 2),
  );

  return (
    <div>
      <CafeteriaPage cafeterias={cafeteriasWithMenus} />
    </div>
  );
}
