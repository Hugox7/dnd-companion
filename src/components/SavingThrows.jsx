import { ABILITIES } from "@/constants/dndApiResources";

export default function SavingThrows({ masteredSavingThrows, abilities }) {
    const formattedSavingThrows = masteredSavingThrows.map((el) => el.index);

    return (
        <div className="border-2 border-solid rounded-md border-secondary flex flex-col gap-4 p-6">
            <p className="font-bold">JETS DE SAUVEGARDE</p>
            {ABILITIES.map((item) => {
                const isMastered = formattedSavingThrows.includes(item.index);
                return (
                    <div className="flex flex-row gap-4 items-center">
                        {isMastered ? (
                            <div className="w-[10px] h-[10px] rounded-full bg-primary" />
                        ) : (
                            <div className="w-[10px] h-[10px] rounded-full border border-primary" />
                        )}
                        <p className="font-bold text-xl">+2</p>
                        <p>{item.fr}</p>
                    </div>
                );
            })}
        </div>
    );
}
