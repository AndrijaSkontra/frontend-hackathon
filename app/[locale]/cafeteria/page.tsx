import { auth } from "@/auth";

export default async function CafeteriaPage() {
  const session = await auth();
  console.log(session, "cafe");
  return <div>suck this homie</div>;
}
