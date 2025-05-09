import { auth } from "@/auth";
import CafeteriaPage from "./clientPage";
import { Session } from "next-auth";
import { redirect } from "@/i18n/navigation";

interface ExtendedSession extends Session {
  user: {
    accessToken: string;
  } & Session["user"];
}

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const session = (await auth()) as ExtendedSession;
  const { locale } = await params;
  if (!session?.user?.accessToken) {
    redirect({ href: "/login", locale: locale });
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

  console.log(JSON.stringify(cafeteriasWithMenus, null, 2));

  return (
    <div>
      <CafeteriaPage cafeterias={cafeteriasWithMenus} />
    </div>
  );
}
