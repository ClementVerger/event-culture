
function LieuList({ lieux }) {

    return (
        <div className="flex flex-wrap justify-center">
            {lieux.length > 0 ? (
                lieux.map((lieu) => (
                    <div className="card bg-base-300 w-96 shadow-xl m-5 rounded-b-lg" key={lieu.id}>
                        <figure>
                            <img
                                src='https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFyaXN8ZW58MHx8MHx8fDA%3D'
                                alt="Lieu"
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                        </figure>
                        <h2 className="card-title text-orange-500">{lieu.nom}</h2>
                        <p className="card-body">{lieu.adresse}</p>
                    </div>
                ))
            ) : (
                <p>Aucun lieu ajouté pour le moment.</p>
            )}
        </div>
    );
}

export default LieuList;