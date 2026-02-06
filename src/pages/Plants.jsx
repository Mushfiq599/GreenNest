import { useParams } from "react-router-dom";

export default function Plants() {
    const { id } = useParams();
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold">Category Plants</h1>
            <p className="text-gray-600 mt-2">Category ID: {id}</p>
        </div>
    );
}
