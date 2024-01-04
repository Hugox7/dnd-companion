export default function Ability({ modifier, ability, label }) {
    return (     
        <div className="relative border-2 border-solid rounded-md border-secondary w-24 h-24 flex flex-col justify-start items-center pt-1">
        <p className="w-24 text-center text-primary text-xs mb-1">{label.toUpperCase()}</p>
            <p className="font-bold text-3xl">{modifier}</p>
            <div className="flex justify-center items-center absolute border-2 border-secondary bottom-[-20px] left-[26px] rounded-full w-10 h-10 bg-base-100">
                <p className="font-bold">{ability}</p>
            </div>
        </div>
    );
}