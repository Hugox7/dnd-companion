import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useHandleSubmitError } from "./useHandleSubmitError";

export function useAuth() {
  const supabase = createClientComponentClient();

  const router = useRouter();
  // const { handleLoginError, handleSignUpError } = useHandleSubmitError();
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsPending(true);
    await supabase.auth.signOut();
    router.push('/auth/login');
  }

  const handleLogin = async (values) => {
    const { data, error } = await supabase.auth.signInWithPassword(values);
    if (error) {
      // handleLoginError(error);
    }
    if (data.session) {
      router.push('/app');
    }
  }

  const handleSignup = async (values) => {
    const { data, error: signupError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (signupError) {
      // return handleSignUpError(signupError);
    }
    if (data.session) {
      await supabase.from('profile').insert({ id: data.session.user.id, name: values.name });
      router.push('/app');
    }
  }

  return {
    isPending,
    handleLogout,
    handleLogin,
    handleSignup,
  }
}