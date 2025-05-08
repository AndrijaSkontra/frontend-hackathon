import AuthForm from "./components/auth-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ invalidLogin: string }>;
}) {
  const { invalidLogin } = await searchParams;
  console.log(invalidLogin, "invalidLogin1111");
  return (
    <div>
      <AuthForm invalidLogin={invalidLogin === "1?error=Configuration"} />
    </div>
  );
}
