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

