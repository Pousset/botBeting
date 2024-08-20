BotDiscord
BotDiscord est un bot Discord conçu pour organiser des paris interactifs entre utilisateurs. Il permet de créer des paris, de rejoindre ceux en cours avec des prédictions, et de terminer les paris avec un affichage des résultats sous forme de classement.

Fonctionnalités
Créer un pari: Les utilisateurs peuvent créer un pari en définissant les équipes ou termes à parier.
Rejoindre un pari: Les utilisateurs peuvent participer à un pari en cours en faisant une prédiction sur le vainqueur et le score.
Terminer un pari: Une fois le pari terminé, l'utilisateur peut conclure le pari, calculer les points et afficher un classement des participants.
Affichage des résultats: Les résultats sont présentés sous forme de classement avec les points obtenus par chaque participant.
Installation
Prérequis
Node.js (version 14 ou supérieure)
npm
Étapes d'installation
Clonez ce dépôt sur votre machine locale :

bash
Copier le code
git clone https://github.com/votre-utilisateur/BotDiscord.git
cd BotDiscord
Installez les dépendances :

bash
Copier le code
npm install
Créez un fichier .env à la racine du projet et ajoutez-y votre token Discord :

env
Copier le code
DISCORD_TOKEN=your_discord_bot_token
Démarrez le bot :

bash
Copier le code
node index.js
Commandes Disponibles
!bet
Description: Crée un nouveau pari.

Utilisation:

diff
Copier le code
!bet
Exemple:

diff
Copier le code
!bet
Le bot vous demandera ensuite de spécifier les termes du pari (par exemple, les équipes).

!joinbet
Description: Rejoindre un pari en cours en faisant une prédiction sur le vainqueur et le score.

Utilisation:

diff
Copier le code
!joinbet
Exemple:

diff
Copier le code
!joinbet
Le bot vous guidera pour choisir le pari en cours et soumettre vos prédictions.

!endbet
Description: Terminer un pari en cours, calculer les points et afficher le classement des participants.

Utilisation:

diff
Copier le code
!endbet
Exemple:

diff
Copier le code
!endbet
Le bot vous demandera de spécifier le pari à terminer et les scores réels des équipes.

Structure du Projet
commands/bet.js: Commande pour créer un pari.
commands/joinbet.js: Commande pour rejoindre un pari existant.
commands/endbet.js: Commande pour terminer un pari et afficher les résultats.
utils/betManager.js: Gestion des paris, incluant la création, la prédiction, et le calcul des points.
Exemple d'Utilisation
Créer un pari
Utilisez la commande !bet.
Le bot vous demandera d'entrer les noms des deux équipes ou termes du pari.
Rejoindre un pari
Utilisez la commande !joinbet.
Choisissez le pari en cours et faites votre prédiction sur le vainqueur et les scores.
Terminer un pari
Utilisez la commande !endbet.
Indiquez le pari à terminer et entrez les scores réels.
Le bot calculera les points et affichera le classement final.
Contribuer
Les contributions sont les bienvenues. Vous pouvez soumettre une pull request ou ouvrir une issue pour discuter des changements majeurs.

Licence
Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus de détails.