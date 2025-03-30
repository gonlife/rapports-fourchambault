// Emplacement: /functions/verify-auth.js
exports.handler = async (event, context) => {
  // Récupérer le chemin demandé
  const path = event.path;
  
  // Récupérer le cookie d'authentification
  const cookies = event.headers.cookie || '';
  const authCookie = getCookieValue(cookies, 'gon_auth_token');
  
  // Vérifier si l'utilisateur a un token d'authentification valide
  if (!authCookie) {
    // Si aucun token d'authentification, rediriger vers la page de connexion
    return {
      statusCode: 302,
      headers: {
        'Location': '/',
        'Cache-Control': 'no-cache'
      }
    };
  }
  
  try {
    // Ici, vous pourriez vérifier la validité du token
    // Par exemple, en le déchiffrant ou en vérifiant sa signature
    // Pour cet exemple, nous allons simplement vérifier sa présence
    
    // Si l'authentification est valide, servir le contenu demandé
    // Notez: Netlify ne peut pas servir directement le contenu à partir d'une fonction
    // Nous redirigeons donc vers la ressource demandée avec un cookie spécial
    return {
      statusCode: 302,
      headers: {
        'Location': path,
        'Set-Cookie': 'gon_auth_verified=true; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600',
        'Cache-Control': 'no-cache'
      }
    };
  } catch (error) {
    console.error('Erreur de vérification du token:', error);
    return {
      statusCode: 302,
      headers: {
        'Location': '/',
        'Cache-Control': 'no-cache'
      }
    };
  }
};

// Fonction utilitaire pour extraire la valeur d'un cookie
function getCookieValue(cookieString, cookieName) {
  const cookies = cookieString.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value;
    }
  }
  return null;
}