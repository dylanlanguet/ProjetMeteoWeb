# Utilisez une image Node.js
FROM node:14

# Définissez le répertoire de travail
WORKDIR /usr/src/app

# Copiez les fichiers nécessaires dans le conteneur
COPY package*.json ./
COPY app ./app
COPY index.js ./

# Installez les dépendances
RUN npm install

# Exposez le port sur lequel votre application écoute
EXPOSE 8080

# Commande pour démarrer votre application
CMD ["node", "index.js"]
