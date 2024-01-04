// import CreateCharacterDialog from "./CreateCharacterDialog";
import Image from "next/image";
import CreateCharacterDialog from "./CreateCharacterDialog";

export default function CharactersListEmptyState() {

    const onOpen = () => document.getElementById('create_character_modal').showModal();

  return (
    <div className="pt-12 flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <Image width={200} className="mb-5" height={300} src='/erudit.png' alt='Dungeons and dragons erudit' />
        <p className="text-center mb-5 text-xl">Vous n'avez pas encore de personnage<br />Lancez-vous maintenant</p>
        <button className="btn btn-primary btn-wide" onClick={onOpen}>
          Créer un personnage
        </button>
        <CreateCharacterDialog />
      </div>
    </div>
  );
}