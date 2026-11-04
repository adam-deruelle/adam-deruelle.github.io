// Archive : auto-évaluations de fin de BUT 1 reprises de l'ancien site (textes d'origine, en français).
// level : note sur 5 donnée à l'époque.

export const competencesBut = [
  {
    code: 'C1',
    title: 'Concevoir la partie GEII d’un système industriel',
    items: [
      {
        skill: 'Je suis capable de produire une analyse fonctionnelle d’un système simple',
        level: 4,
        text: 'Dans le projet Variateur de lumière, j’ai été amené à récupérer un schéma existant et à l’expliquer afin de pouvoir créer un prototype de la carte.'
      },
      {
        skill: 'Je suis capable de réaliser un prototype pour des solutions techniques matériel et/ou logiciel',
        level: 4,
        text: 'Dans le projet Variateur de lumière, j’ai réalisé un prototype d’un variateur de lumière en m’inspirant d’un produit déjà existant et en ajoutant quelques fonctionnalités, comme la possibilité de détecter automatiquement la luminosité à produire en fonction de l’éclairage de la pièce.'
      },
      {
        skill: 'Je suis capable de rédiger un dossier de fabrication à partir d’un dossier de conception',
        level: 3,
        text: 'Lors du projet du variateur de lumière, j’ai dû réaliser un compte rendu sur le projet, et dans ce dernier un dossier de fabrication était présent. Il contenait les schémas que nous avons réalisés avec un bref texte d’explication pour chaque schéma.'
      }
    ]
  },
  {
    code: 'C2',
    title: 'Vérifier la partie GEII d’un système industriel',
    items: [
      {
        skill: 'Je suis capable d’appliquer une procédure d’essai',
        level: 4,
        text: 'Lors des essais effectués sur la carte, une procédure rigoureuse a été suivie : la vérification des tensions d’entrée et de sortie, et la validation des fonctionnalités des différents composants principaux (sons, boutons poussoirs, joystick).'
      },
      {
        skill: 'Je suis capable d’identifier un dysfonctionnement',
        level: 5,
        text: 'Lors des essais effectués sur la carte, je me suis rendu compte que l’un des axes du joystick ne fonctionnait pas. J’ai alors repris mon schéma fonctionnel et me suis rendu compte que l’axe concerné n’était pas alimenté.'
      },
      {
        skill: 'Je suis capable de décrire les effets d’un dysfonctionnement',
        level: 4,
        text: 'Le dysfonctionnement décrit ci-dessus n’avait pas de réel impact sur la carte en elle-même. Cependant, lorsque l’on voulait utiliser le joystick pour jouer, l’un des axes était indisponible.'
      }
    ]
  }
]
