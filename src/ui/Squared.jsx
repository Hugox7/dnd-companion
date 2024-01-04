export default function Squared({ value, label }) {
    return (
        <div className="relative border-2 border-solid rounded-md border-secondary w-24 h-24 flex flex-col justify-between items-center pt-1 pb-2">
            <p className="w-24 text-center text-primary text-xs mb-3">{label.toUpperCase()}</p>
            <p className="font-bold text-3xl">{value}</p>
        </div>
    );
}