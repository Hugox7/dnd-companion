import { redirect } from "next/navigation";

// This page is only here to redirect to "/app" home page
export default function Home() {

  return redirect('/app');
}
