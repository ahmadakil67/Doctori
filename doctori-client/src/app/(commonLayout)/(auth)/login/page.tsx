import LoginForm from "@/components/login-form";

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 md:p-8">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500">
            Enter your credentials to access your account
          </p>
        </div>
        
        <LoginForm redirect={params.redirect} />
      </div>
    </div>
  );
};

export default LoginPage;