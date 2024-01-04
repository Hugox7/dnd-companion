import { ABILITIES, ABILITY_MODIFIER, ALIGNMENTS_LIST, CLASSES_LIST, RACES_LIST } from "@/constants/dndApiResources";
import Ability from "@/ui/Ability";
import Datablock from "@/ui/Datablock";
import Shield from "@/ui/Shield";
import Squared from "@/ui/Squared";
import SavingThrows from "./SavingThrows";

export default function CharacterSheet({ character, user }) {
    const currentClass = CLASSES_LIST.find((el) => el.index === character.class).fr;
    const currentRace = RACES_LIST.find((el) => el.index === character.race).fr;
    const currentAlignment = ALIGNMENTS_LIST.find((el) => el.index === character.alignment).fr;

    console.log(character);

    return (  
        <>
            {/* Hidden under 768px - Desktop screen */}
            <main className="hidden sm:block">
                <div className="flex flex-row justify-between">
                    <p className="text-2xl font-bold mb-6">{character.name} </p>
                    <button className="btn btn-secondary">Editer</button>
                </div>
                

                <div className="flex flex-row flex-wrap gap-12 mb-10">
                    <Datablock label="Classe" value={currentClass} />
                    <Datablock label="Race" value={currentRace} />
                    <Datablock label="Niveau" value={character.level} />
                    <Datablock label="Nom du joueur" value={user.name} />
                    <Datablock label="Alignement" value={currentAlignment} />
                    <Datablock label="Historique" value={character.historic} />
                    <Datablock label="XP" value={character.xp || 0} />
                </div>

                <div className="flex flex-row flex-wrap gap-12 mb-14">
                    <div className="flex flex-row flex-wrap gap-8 mr-16">
                        {ABILITIES.map(({ index, fr }) => {
                            return <Ability modifier={ABILITY_MODIFIER[character[index] || 0]} ability={character[index] || 0} label={fr} />;
                        })}
                    </div>
                    <div className="flex flex-wrap flex-row gap-8 items-center">
                        <Shield value={character.armor_class || 0} />
                        <Squared value={"+" + character.proficiency_bonus} label="Bonus de maitrise" />
                        <Squared value={character.inspiration} label="inspiration" />
                        <Squared value={character.initiative} label="Initiative" />
                        <Squared value={character.speed} label="Vitesse" />
                    </div>
                </div>

                <div className="flex flex-row flex-wrap gap-10">
                    <SavingThrows masteredSavingThrows={character.classInfo.saving_throws} />
                </div>
            </main>

            {/* Hidden above 767px - Mobile screen */}
            <main className="block sm:hidden">
                Test xs screen
            </main>
        </>
    );
}