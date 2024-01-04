export default function Datablock({ label, value }) {
    return (
        <div>
            <p className="font-bold">{label}</p>
            <p>{value}</p>
        </div>
    );
}