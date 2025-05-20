function SiteList({ sites }) {
  return (
    <div className="flex flex-wrap justify-center">
        {sites.length > 0 ? (
            sites.map((site) => (
                <div className="card bg-base-300 w-96 shadow-xl m-5 rounded-b-lg" key={site.id}>
                    <figure>
                        <img
                            src={site.image_url}
                            alt="Site"
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                    </figure>
                    <h2 className="card-title text-orange-500">{site.nom}</h2>
                    <p className="card-body">{site.titre}</p>
                    <p className="card-body">{site.type}</p>
                </div>
            ))
        ) : (
            <p>Aucun site ajouté pour le moment.</p>
        )}
    </div>
  );
}
export default SiteList;