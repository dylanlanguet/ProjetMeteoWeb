const express = require('express');
const path = require('path');

const app = express();

// Middleware pour autoriser les fichiers statiques depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'app')));

// Assurez-vous que votre serveur écoute le bon port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
