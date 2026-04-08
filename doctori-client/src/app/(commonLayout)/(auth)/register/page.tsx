import RegisterForm from "@/components/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <Card className="border-gray-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <CardHeader className="mb-2 space-y-2 text-center pb-0">
            <CardTitle className="text-3xl font-semibold tracking-tight text-gray-900">
              Create an account
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;