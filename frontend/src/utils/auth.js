import api from "../api/api"; // Assure-toi que ton instance Axios est bien importée

// Essayer de décoder le JWT (rapide, pas de requête serveur).
export const getUserId = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    // Décoder le JWT
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId;
  } catch (error) {
    console.error("Erreur lors du décodage du token:", error);
    return await fetchUserIdFromAPI(); // Fallback vers l'API
  }
};

// Si ça échoue, faire une requête à /api/current_user.
export const fetchUserIdFromAPI = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await api.get("/api/current_user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.id;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }
};
