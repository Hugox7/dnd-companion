"use client"

import { supabase } from "@/lib/supabase";
import CharactersListEmptyState from "./CharactersListEmptyState";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import _ from "lodash";
import { CLASSES_LIST, RACES_LIST } from "@/constants/dndApiResources";

export default function CharactersList({ userId }) {

  const [charactersList, setCharactersList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const { data } = await supabase
          .from('characters')
          .select()
          .eq('user', userId);
        setCharactersList(data);
      } catch {
        // TODO error toast
        console.error('error');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCharacters();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-row flex-wrap gap-8 pt-4">
        {_.range(4).map((el) => (
          <div key={el} className="flex flex-col gap-4 w-96">
            <div className="skeleton h-48 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  console.log(charactersList)

  if (charactersList.length > 0) {
    return (
      <div className="flex flex-row gap-6 flex-wrap">
        {charactersList.map((character) => {
          const currentClass = CLASSES_LIST.find((el) => el.index === character.class).fr;
          const currentRace = RACES_LIST.find((el) => el.index === character.race).fr;
          return (
            // <div key={character.id} className="card card-side bg-base-200 shadow-xl max-w-lg">
            //   <figure><Image height={300} width={150} src="/classes/cleric.jpeg" alt="Movie"/></figure>
            //   <div className="card-body">
            //     <h2 className="card-title">{character.name}</h2>
            //     <p>{currentClass} {currentRace} - Niveau {character.level} </p>
            //     <div className="card-actions justify-end">
            //       <Link href="/app/character/21">
            //         <button className="btn btn-primary">Voir</button>
            //       
            //     </div>
            //   </div>
            // </div>
            <div className="card w-96 glass">
              
              <div className="card-body">
                <h2 className="card-title">{character.name}</h2>
                <p className="mb-5">{currentClass} {currentRace} - Niveau {character.level}</p>
                <div className="card-actions justify-end">
                  <Link href={"/app/character/" + character.id}>
                    <button className="btn btn-primary">Voir fiche</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return <CharactersListEmptyState />;
}