import { Suspense } from "react";
import ResetPasswordForm from "./reset-password-form";

export default function ResetPasswordPage() {
  return (
    <main className="min-h-[calc(100svh-5rem)] bg-[#FFF4E2] px-4 py-14 text-[#25170F] dark:bg-[#160C07] dark:text-[#F8EBCF] sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="mx-auto max-w-xl rounded-[32px] border border-[#E0C7A8] bg-white/88 p-8 text-[#715342] shadow-[0_24px_70px_rgba(72,40,14,0.14)] dark:border-[#D4A72C]/18 dark:bg-[#21130C] dark:text-[#CDBB9E]">
            Loading reset form...
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
