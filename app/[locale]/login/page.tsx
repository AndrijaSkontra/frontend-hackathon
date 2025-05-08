import AuthForm from "./components/auth-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ invalidLogin: string }>;
}) {
  const { invalidLogin } = await searchParams;

  // Define fixed shapes to avoid hydration errors
  const decorativeShapes = [
    { width: "150px", height: "150px", top: "10%", left: "5%", opacity: 0.7 },
    { width: "120px", height: "120px", top: "70%", left: "15%", opacity: 0.6 },
    { width: "100px", height: "100px", top: "30%", left: "85%", opacity: 0.5 },
    { width: "80px", height: "80px", top: "60%", left: "80%", opacity: 0.7 },
    { width: "130px", height: "130px", top: "20%", left: "40%", opacity: 0.6 },
    { width: "110px", height: "110px", top: "80%", left: "60%", opacity: 0.5 },
    { width: "90px", height: "90px", top: "40%", left: "20%", opacity: 0.7 },
    { width: "160px", height: "160px", top: "50%", left: "75%", opacity: 0.4 },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-300/70 via-orange-200/60 to-yellow-100/70">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        {decorativeShapes.map((shape, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-orange-400/70 blur-lg"
            style={{
              width: shape.width,
              height: shape.height,
              top: shape.top,
              left: shape.left,
              opacity: shape.opacity,
            }}
          />
        ))}
      </div>

      {/* Auth form with relative positioning to appear above the shapes */}
      <div className="relative z-10">
        <AuthForm invalidLogin={invalidLogin === "1?error=Configuration"} />
      </div>
    </div>
  );
}
