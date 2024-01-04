export default function Shield({ value }) {
    return (
        <div className="relative border-2 border-solid rounded-full border-secondary w-24 h-24 flex flex-col justify-start items-center pt-2">
            <p className="w-24 text-center text-primary text-xs mb-1">CLASSE <br />D'ARMURE</p>
            <p className="font-bold text-3xl">{value}</p>
        </div>
    );
}
