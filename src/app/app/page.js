"use client"

import CharactersList from "@/components/CharactersList";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Dashboard() {
  const { id } = useCurrentUser();

  return (
    <main>
      <CharactersList userId={id} />
    </main>   
  );
}
