const jwt = require('jsonwebtoken')
const privateKey = require('./private-key')


module.exports = (req, res, next) => {
  // on récupère dans l'entête de la requête : le token
  const enteteAutorisation = req.headers.authorization
  // si token null :
  if(!enteteAutorisation) {
    const message = `Pas de jeton (token) d'authentification. Ajoutez un token dans entête.`
    return res.status(401).json({ message })
  }
  // on extrait le token qui se trouve après un espace : avant il y a une
  // clé qui nous n'intresse pas :
  const leToken = enteteAutorisation.split(' ')[1]
  // est ce que le token est valide ?
  const tokenDecode = jwt.verify(leToken, privateKey, (error, tokenDecode) => {
    // token pas bon :
    if(error) {
      const message = `L user n est pas autorisé à accèder à cette ressource.`
      return res.status(401).json({ message, data: error })
    }
    // Token OK : On récupère le id user dans le token :
    const userId = tokenDecode.userId
    // est ce que le user fourni dans la connexion est celui du token ?
    if (req.body.userId && req.body.userId !== userId) {
      const message = `Id user invalide.`
      res.status(401).json({ message })
    } else {
      req.userId = userId; // Ajout de l'userId à l'objet req
      next()          // tout est OK : le user peut envoyer des requêtes
    }
  })
}


