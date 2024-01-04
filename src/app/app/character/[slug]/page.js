"use client"

import CenteredCircularProgress from "@/components/CenteredCircularProgress";
import CharacterSheet from "@/components/CharacterSheet";
// import CharacterSheet from "@/components/CharacterSheet";
import { DND_API_BASE_URL } from "@/constants/dndApiResources";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function character({ params: { slug } }) {
  const router = useRouter();
  const user = useCurrentUser();

  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      const { data } = await supabase.from("characters").select().eq("id", slug).single();
      const promises = [
        fetch(DND_API_BASE_URL + '/api/classes/' + data.class).then((res) => res.json()),
        fetch(DND_API_BASE_URL + '/api/races/' + data.race).then((res) => res.json())
      ]
      const response = await Promise.all(promises);
      setCharacter({...data, classInfo: response[0], raceInfo: response[1]});
    }

    try {
      fetchCharacter();
    } catch {
      // TODO error toast
      console.error('Error');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return (
    <>
      {isLoading || !character ? (
        <CenteredCircularProgress />
      ) : (
        <CharacterSheet character={character} user={user} />
      )}
    </>
  );
}