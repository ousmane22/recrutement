# Projet Laravel 12 & Angular 19

## Description
Ce projet est une application full-stack développée avec **Laravel 12** pour le backend et **Angular 19** pour le frontend. Il utilise **Sanctum** pour la sécurité, **Docker** pour la conteneurisation, **MySQL** pour la base de données et **Gmail** pour l'envoi des e-mails.

## Technologies utilisées
### Backend : Laravel 12
- Framework PHP pour le backend
- Gestion de la sécurité avec **Sanctum**
- Envoi d'e-mails via **Gmail**
- API documentée avec **Postman**

### Frontend : Angular 19
- Framework moderne pour le frontend
- **Tailwind CSS** pour le design
- **Gestion des langues** (i18n)

### Autres outils
- **Docker** : Conteneurisation pour simplifier le déploiement
- **MySQL** : Base de données
- **Git & GitHub** : Gestion de version

---

## Installation & Configuration
### 1️ Prérequis
- **Docker** & **Docker Compose** installés
- **Node.js** & **npm** (pour Angular)

### 2️ Cloner le projet
```sh
git clone https://github.com/TON-UTILISATEUR/TON-REPO.git
cd TON-REPO
```

### 3️ Démarrer le backend avec Docker
```sh
docker-compose up -d --build
```

### 4️ Lancer le frontend Angular
```sh
cd frontend
npm install
npm start
```

---

## 🔐 Configuration Laravel
Créer un fichier `.env` à la racine du projet et configurer :
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=entretien
DB_USERNAME=root
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=ousmanend2211@gmail.com
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=ousmanend2211@gmail.com
MAIL_FROM_NAME="${APP_NAME}"
```
Lancer les migrations :
```sh
php artisan migrate --seed
```

---

## 📌 Liens utiles
- 🛠 **Trello** : [Lien Trello](https://trello.com/b/TON_LIEN_TRELLO)
- 🔗 **Dépôt GitHub** : [Lien GitHub](https://github.com/TON-UTILISATEUR/TON-REPO)
- 🌍 **Déploiement Backend** : [API en ligne](https://api.ton-site.com)
- 🎨 **Déploiement Frontend** : [Application Web](https://www.ton-site.com)
- 📌 **Collection Postman** : [Télécharger la collection](https://www.postman.com/collections/TON_LIEN_POSTMAN)

---

## 📞 Support
Si vous avez des questions, ouvrez une issue sur [GitHub](https://github.com/TON-UTILISATEUR/TON-REPO/issues).

