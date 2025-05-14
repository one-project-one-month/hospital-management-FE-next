import { Hospital } from "lucide-react";
import { LoginForm } from "@/components";

export default function LoginPage() {
  return (
    <main className="!m-0 w-screen">
      <div className="bg-muted flex size-full min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a className="flex items-center gap-2 self-center font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Hospital className="size-4" />
            </div>
            Hospital Management
          </a>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
