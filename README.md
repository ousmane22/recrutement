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
git clone https://github.com/ousmane22/recrutement.git
cd 
```

### 3️ Démarrer le backend avec Docker
```sh
docker-compose up -d --build
```

### 4️ Lancer le frontend Angular
```sh
cd auth.front
npm install
npm start
```

---

## Configuration Laravel
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

## Liens utiles
- **Canva** : [Application Web](https://www.canva.com/design/DAGh77zN8RU/ThoVGniDa8GN6Zi9QNAOBA/edit?utm_content=DAGh77zN8RU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- **Trello** : [Lien Trello](https://trello.com/invite/b/67d6066e732401bbbb71e2e4/ATTI22326a4c0a6ca2f603faf37d19577657BCCD9682/entretien)
- **Déploiement Backend** : [API en ligne]()
- **Déploiement Frontend** : [Application Web]()
- **Collection Postman** : [Télécharger la collection](https://gold-astronaut-737234.postman.co/workspace/New-Team-Workspace~a9bc200b-d744-4224-a71e-adcb4806d419/collection/37269911-b15dfc4e-0ebe-4c53-a22d-eeafbf101cd6/overview?action=share&creator=37269911)

---

## Support
Si vous avez des questions, +221 77 775 01 77 ou ousmanend2211@gmail.com

