export default function Cards({ titulo, texto, link, mostrarLink = false }) {
  const isFake = link?.includes("stealmylogin");

  const handleClick = (e) => {

    if (isFake) {
      e.preventDefault();
      
    }
  };

  return (
    <div
      style={{ border: "1px solid red", width: "350px", margin: "20px", padding: "15px" }}
      className="bg-white shadow-md rounded-xl p-6 border border-red-500 hover:shadow-lg transition"
    >
      <p className="text-xl font-semibold text-gray-800 mb-2">{titulo}</p>
      <p className="text-gray-600 mb-3">{texto}</p>

      {mostrarLink && link && (
        <a
          href={link}
          onClick={handleClick}
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:underline ${isFake ? "text-red-500" : "text-blue-500"}`}
        >
          Acessar
        </a>
      )}
    </div>
  );
}
