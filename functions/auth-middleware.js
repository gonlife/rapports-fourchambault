// Emplacement: /functions/auth-middleware.js
exports.handler = async (event, context) => {
  // Extraire le chemin de la requête
  const path = event.path;
  
  // Si la route n'est pas un rapport, laisser passer
  if (!path.startsWith('/reports/')) {
    return {
      statusCode: 200,
      body: JSON.stringify({ allowed: true })
    };
  }
  
  // Vérifier la présence du token d'authentification
  const authHeader = event.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
  
  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ 
        error: 'Authentification requise',
        redirect: '/' 
      })
    };
  }
  
  try {
    // Vérifier la validité du token (à adapter selon votre système)
    // Cet exemple suppose que votre token est généré côté client
    // et contient des informations sur l'authentification
    
    // Pour une sécurité optimale, vous devriez utiliser une 
    // signature ou JWT pour vos tokens
    
    // Si le token est valide, autoriser l'accès
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        allowed: true,
        // Vous pouvez retourner d'autres informations utiles ici
      })
    };
  } catch (error) {
    console.error('Erreur de vérification du token:', error);
    return {
      statusCode: 401,
      body: JSON.stringify({ 
        error: 'Token invalide',
        redirect: '/' 
      })
    };
  }
};