# Analyse des donateurs du Parti Concervateur du Québec

##  Sommaire
---

### Contexte
Ce projet vise à développer un nouveau format de visualisation de données pour une équipe de journalisme de données du Devoir. Ce type de journalisme nécessite une profonde analyse de jeux de données pour construire une histoire. Toutefois, c’est la visualisation des données qui permet de rendre l’histoire accessible au public.

Le Devoir est un grand média québécois qui développe activement ce type de journalisme. Actuellement, leur équipe de journaliste de données travaille en collaboration avec Thomas Hurtut, professeur du département de génie logiciel de Polytechnique Montréal. C’est sous la supervision de Prof. Hurtut que je réalise mon projet informatique dans le cadre du cours IFT3150.

### Travail à faire
Pour réaliser ce projet, je vais devoir acquérir les données, analyser les données et créer une visualisation de données. La portion d'acquisition et d'analyse s'effectuera à l'aide de Python. Le volet visualisation s'effectuera en parti avec Plotly, une librairie de Python qui permettra d'explorer les options. Une fois choisi, la visualisation finale sera réalisé sur D3.js.

## A. Énoncé du projet
---

À l'automne 2022, le Québec ira aux urnes afin d'élir les députés qui participeront à la 43e législature. Le Devoir s'intéresse donc à la publication d'articles à ce sujet dans les prochains mois. Plus particulièrement, à court terme, il aimerait connaître qui sont les donateurs du Parti Concervateur du Québec (PCQ) en raison de son regain de popularité dans la province. 

Il s'agit d'une prémice pour un projet de journalisme de données qui se résume généralement dans les phases suivantes:

1) Collecte des données
2) Préparation et exploration des données
3) Formulation de la question de recherche
4) Analyse des données
5) Choix du design de visualisation
6) Création de la ou les visualisations

## B. Description détaillée
---

## B.1 Collecte des données (20-30 heures)

Pour ce projet, la collecte des données s'effectuera sur le site [d'élection québec](https://www.electionsquebec.qc.ca/francais/provincial/financement-et-depenses-electorales/recherche-sur-les-donateurs.php). Dans un premier temps, le projet consistera dans le développement d'un outil d'extraction des données automatisées afin d'obtenir les informations publiques suivantes :
- Nom
- Prénom
- Montant du don
- Nombre de versement
- Entité politique ayant reçu le don
- Années financière du don
- Ville de résidence du donateur au moment du don
- Code postal du donateur au moment du don

Ces informations sont publiques, toutefois, la façon que le site est conçu rend extrêment difficile d'obtenir la ville et le code postal. En effet, pour obtenir le nom et le code postal, il faut cliquer sur le nom d'un individu. Ces informations ne sont pas accessible avec l'exportateur CSV offert par le site. Or, ce sont des informations extrêmement utiles aux journalistes afin de comprendre la provenance des dons en visualisant les données sur une carte par exemple. Ainsi, dans un premier temps, l'objectif sera de créer un robot (scraper), permettant d'extraire facilement les dons.

> ***Livrables attendus B.1 Collecte des données***
>  
> 1. Un outil d'extraction des donnateurs
>       + Rapide
>       + Réutilisable
>       + Paramétrable
> 2. Un fichier csv contenant les huits attributs spécifiés plus haute (nom, prenom, etc)
> 

### Robot extracteur de données (scraper)

Pour répondre à la problématique, je vais créé un robot qui permettra d'extraire les données nécessaires. L'outil en question sera codé en Python avec l'aide de la librairie [selenium](https://www.selenium.dev/documentation/) et de [*beautifulsoup4*](https://pypi.org/project/beautifulsoup4/). Selenium est un outil permettant d'automatiser la navigation web. Cet outil est nécessaire car les données sont accessibles dynamiquement dans la page du site d'élection Québec. *Beautifulsoup4*, quant à lui, est un outil pour *parser* de l'information contenu dans une structure HTML. 

Cette section du projet comportera trois éléments, un robot pour extraire les données, un *parser* pour standardiser la sortie des données et un point d'entrée permettrant d'indiquer les paramètres du programme.


## B.2 Préparation et exploration des données (10-20h)
---

L'objectif de cette phase est de préparer les données pour la phase d'analyse. Il faudra s'assurer d'avoir toutes les informations nécessaire afin de répondre aux questions de recherches potentielles qui seront formuler dans la prochaine section.

Il faudra également présenter des graphiques et des tableaux statistiques pour aider à guider les questions de recherche de la section B.3.

> ***Livrables attendus B.2 Préparation et exploration des données***
>  
> 1. Un jeu de données utilisable pour la section B.4
> 2. Des graphiques permettant d'explorer grossièrement les données pour la section B.3
> 3. Des tableaux avec des statistiques sommaires des attributs pour la section B.3 
> 

### Ajout du genre du donateur

Une information simple qui manque sera le genre du donateur. Il existe plusieurs API en ligne permettant d'inférer le nom à partir du prénom. L'ajout de cette information sera faite avec un script Python.

### Préparation et exploration

Cette portion du travail s'effectura avec Python et le module Pandas. La visualisation des données se fera quant à elle avec la librairie Plotly qui permet de rapidement créer des graphiques interactifs.


## B.3 Formulation de la question de recherche (5-10h)
---

Pour formuler la question de recherche, je vais utiliser l'outil [*research rabbit*](https://researchrabbitapp.com/) dans le but de lire quelques articles de recherche pertinent. Par la suite, je vais rencontré un expert pour obtenir son opinion à partir des tableaux et visualisation de la section B.2.

> ***Livrables attendus B.3 Formulation de la question de recherche***
>  
> 1. Une question de recherche globale et une hypothèse
> 2. Une ou des questions de recherches spécifiques et des hypothèses
> 3. Pour chaque question, la liste des données nécessaires pour répondre à la question
> 

## B.4 Analyse des données (10-30h)
---

L'objectif de cette section est de manipuler les données afin de répondre aux questions. Une première étape consistera en définir une méthode pour chaque question afin d'éviter de se perdre dans l'exploration. Cette manipulation des données s'effectuera avec Python et la librairie pandas dans des *jupyter notebooks*.

> ***Livrables attendus B.4 Analyse des données***
>  
> 1. Les réponses aux questions formuler dans la section B.3
> 2. Les données nécessaire pour répondre aux questions exporter en format json (pour D3.js)
> 3. Des graphiques interactifs permettant de répondre aux questions
> 

## B.5 Choix du design de visualisation (20-30h)
---

Il exite une multitude de graphiques possibles permettant de visualiser les données. Une approche centrée sur l'utilisateur sera employé pour arriver à un choix final de design. Les utilisateurs de ces graphiques sont les lecteurs du Devoir. Ainsi, il faudra réaliser des graphiques qui sont comprenables par des adultes entre 30 et 50 ans avec un niveau de scolarité universitaire en moyenne. 

Ensuite, il faudra faire définir l'objectif de chaque graphique en lien avec les questions. Par exemple, est-ce que le but est de présenter une relation entre deux variables, une tendance ou simplement une quantité. Type de données viendra restreindre encore plus le choix du type de graphique. Par exemple, les données de localisation sont généralement présenter avec l'aide d'une carte.

> ***Livrables attendus B.5 Choix du design de visualisation***
>  
> 1. Un tableau résumant l'objectif de chaque visualisation avec les données et leur type.
> 2. Plusieurs croquis papier, capture d'écran de graphique trouvé sur le web ou des exemples avec Plotly ou autres outils rapides.
> 3. Un croquis final de ce qui est attendu pour chaque graphique
> 

## B.6 Création de la ou les visualisations (20-30h)
---

Cette dernière étape sera la création d'une ou plusieurs visualisations avec l'aide de D3.js. D3 est un framework de création de graphique en manipulant des éléments du DOM, principalement des éléments SVG. 

À cette étape, il n'y aura plus aucune question ou preque quant au design. L'objectif sera de livrer un graphique clé en main qui pourra être insérer dans l'article qui traitera du sujet des donateurs du PCQ.

> ***Livrables attendus B.6 Création de la ou les visualisations***
>  
> 1. Un tableau résumant l'objectif de chaque visualisation avec les données et leur type.
> 2. Plusieurs croquis papier, capture d'écran de graphique trouvé sur le web ou des exemples avec Plotly ou autres outils rapides.
> 3. Un croquis final de ce qui est attendu pour chaque graphique
> 

## C Plan de développement
---

> Date de début : 14 janvier
> Date de fin prévu : fin avril

B.1 à B.3 doivent être compléter pour début mars

B.4 doit être compléter pour la mi-mars

B.5 à B.6 doivent être complété pour le 15 avril

Finalisation du rapport et de la présentation 15 avril à fin de session.

## D Rapport d'avancement
---

### Semaine du 10 janvier au 28 janvier

Les premières rencontres avec Thomas Hurtut et l'équipe du Devoir ont permis d'établir le choix du sujet et la source des données à analyser. Une fois la source des données choisie, le plan de développement a pu être établi. Initialement, on croyait que le CSV du site du gouvernement permettait d'avoir toutes les informations. Toutefois, on a constaté que le code postal et la ville n'étaient pas inclus. 

C'est à ce moment que le choix a été pris de développer un scrapper afin d'extraire automatiquement les données. J'ai discuté avec Thomas et les développeurs de l'équipe du Devoir pour connaître les spécifications. 

    Scrapper rapide, réutilisable et paramétrable

Le choix de Selenium a également été confirmé.

 > ***Sommaire du 10 janvie au 28 janvier***
 > 1. La source des données sera [Élection Québec](https://www.electionsquebec.qc.ca/francais/provincial/financement-et-depenses-electorales/recherche-sur-les-donateurs.php)
 > 2. La première chose a développer sera un scrapper


### Semaine 31 janvier au 18 février

Très rapidement j'ai eu une solution qui utilisait uniquement Selenium. L'utilisateur rentre dans le code les paramètres de recherche qui sont les mêmes que le site d'élection Québec. Ensuite, le robot parcours toutes les pages et enregistres les données en CSV.

    Problème : la solution actuelle prend 3h50 et ralenti l'ordinateur durant le traitement.

Pour répondre à ce problème, quelques solutions ont été proposées:

1. Utiliser l'option *headless* qui fait en sorte qu'aucune fenêtre chrome s'ouvre.
2. Utiliser *beautifoulSoup4* et Selenium plutôt que seulement Selenium. 
3. Paralléliser le code

À ce moment, le code a du être adapté afin séparer le chargement des données et la lecture des données. Le chargement des données peut uniquement se faire avec Selenium, cette logique est encapsulée dans le module scrapper. La subtilité a été d'extraire toute la page dans une chaîne de charactère qui représente le code HTML de la page avec les données pertinentes. À partir de cette structure de donnée, il est possible d'utilisé *beautifulsoup4* qui est beaucoup plus rapide que Selenium pour naviguer le DOM.

À ce moment, le projet comporte deux packages et fonctionne avec un seul processus : 

- Scrapper : abstraction de la page avec Selenium
- Parser : Utilisation de *beautifoulsoup4* pour extraire les données

L'étape suivante est d'implémenté la parralélisation. Considérant que Google Chrome fonctionne avec un processus différent pour chaque page, l'idée a été de créer un processus pour chaque année dans la requête. 

Par exemple, pour la requête suivante : 

    Années : 2017, 2018, 2019, 2020, 2021, 2022
    Entité Pol : PCQ, PLQ, PQ, QS

Le programme crérait 6 processus différents avec les paramètres suivants : 

    P1
    Année : 2017
    Entité Pol : PCQ, PLQ, PQ, QS

    P2
    Année : 2018
    Entité Pol : PCQ, PLQ, PQ, QS

    ...

    P6
    Annéee : 2022
    Entité Pol : PCQ, PLQ, PQ, QS

Par la suite, le programme pourrait simplement combiner la sortie des différents processus en un seul jeu de données. Cette logique est défini dans le package *Runner*. 


 > ***Sommaire du 31 janvier au 18 février***
 > 1. [Dons-Scrapper](https://github.com/jaytouz/dons-scrapper/tree/83ce4cbe34858a6a78cddb11dbaa9702b3caae04)
 >     -  Version fonctionnelle
 >     -  Temps d'exécution passer de 3h50 en simple thread à 50 minutes en mode headless avec *beautifulsoup4*.
 >     - Version multiprocess implémenter, mais avec des problèmes à régler
 >     - Trois packages : Scrapper, Parser, Runner


### Semaine 21 février au 4 mars

Tout d'abord, le multiprocessing a été abandonné car le problème n'était pas réglable aisément et il ne s'agit pas de l'objectif principal de ce projet.

L'objectif des deux semaines a été de préparer le terrain pour l'analyse de données. J'ai donc, fait une première collecte de données et créer quelques fonctions pour nettoyer les données.

En même temps, j'ai fait quelques recherches pour voir s'il existait de la littérature abordant les dons au Québec. Ces recherches furent peu fructueuse, par contre, j'ai réalisé qu'un groupe de l'UdeM a fait du travail de recherche sur les dons au Fédéral. J'ai donc chercher à rencontrer un expert du département de science politique pour m'assurer de ne rien manquer dans l'analyse.

La conclusion de cette rencontre a été que l'exploration des donateurs du PCQ, du genre des donateurs et de l'impact des lois sur les dons seraient trois sujets très intéressant.

Peu importe le sujet, la question du genre sembblait très intéressante. Ainsi, j'ai développé un prédicteur de genre à partir du prénom en utilisant un base de données des dons du Québec ainsi qu'un API (genderize.io). Une heuristique a permis d'ajouter le genre aux données. L'outil pour les noms du Québec est disponible sur PyPi et fonctionne bien pour des noms de personne née entre 1980 et 2020.

 > ***Sommaire du 21 février au 4 mars***
 > 1. [GenderizerQc](https://github.com/jaytouz/genderizeQc)
 > 2. Entrevue avec Jean-François Godbout
 > 3. Préparation et exploration des données

### Semaine 6 mars au 18 mars

L'analyse c'est fait en plusieurs phases : 

- Nettoyage des données
- Exploration des données
- Réponse par question avec des visualisations

Le nettoyage a consisté à s'assurer qu'il n'y avait pas de valeurs manquantes. En même temps, j'en ai profité pour explorer les distributions de chaque attributs afin de m'assurer qu'il n'y avait pas de valeurs anormales.

Finalement, avec l'équipe du Devoir, j'ai formulé quelques questions afin de guider l'analyse et y répondre. 

    1- Qui sont les donateurs du PCQ? Donnaient-ils pour d'autres partis avant ou s'agit-il de nouveaux donateurs?
    2- D'où viennent les donateurs du PCQ?
    3- Comment se comparent le financement par dons du PCQ par rapport aux autres principaux partis?

Ces analyses ont été faites et présenter à l'équipe du Devoir afin d'obtenir des rétroactions avant de débuter la phase de design des visualisations.


 > ***Sommaire du 6 mars au 18 mars***
 > 1. Début de l'analyse des données du PCQ
 > 2. Définition des questions
 > 3. Analyse des donnée du PCQ
 > 4. Présentation à l'équipe du Devoir


### Semaine 4 avril au 29 avril

Le mois d'avril a été dédié à la programmation D3. J'ai d'abord fait une première version des visualisations en format statique. Dans un deuxième temps, j'ai développer les transtions entre les différents états des visualisations. Enfin, le reste du développement a été consacré au style du site web.

Des modifications ont été apporté pour facilité la compréhension des graphiques. Par exemple, certain graphiques ne seraient pas bien paru en format mobile, donc une simplification du design a été apporté pour en réduire la taille à l'écran.

La dernière semaine a été dédiée au dernière modification suggérée par Thomas et l'équipe du Devoir. Sandrine Vieira et Cedric Gagnon du Devoir se sont occupés de la rédaction du texte et de l'ajout de photo pour accompagner les visualisations.


 > ***Sommaire du 4 avril au 29 avril***
 > 1. Version statique des visualisations
 > 2. Version dynamique avec transition
 > 3. Amélioration du design
 > 4. Article complété et prêt pour publication la semaine suivante


