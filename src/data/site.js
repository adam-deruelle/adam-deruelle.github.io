// Informations de contact et fichiers communs, à un seul endroit.
export const site = {
  email: 'adam.deruelle@gmail.com',
  linkedin: 'https://www.linkedin.com/in/adam-deruelle-',
  github: 'https://github.com/adam-deruelle',
  location: 'Bruz (35170)',
  photo: '/images/profil.webp', // photo de profil (accueil, section À propos)
  // CV une colonne, choisi selon la langue du site (fichiers dans public/cv/)
  cv: {
    fr: '/cv/CV_Adam_Deruelle_FR.pdf',
    en: '/cv/CV_Adam_Deruelle_EN.pdf'
  },
  // Images de l'accueil (WebP dans public/images/accueil/) ; null = cadre « image à venir »
  home: {
    transitions: ['/images/accueil/transition-1.webp', '/images/accueil/transition-2.webp', '/images/accueil/transition-3.webp'] // sous la surface · à propos → projets · projets → recherche
  },
  // Carte « En ce moment j'écoute » (accueil) : pour changer de musique, modifier ces 3 lignes.
  // spotifyId = la fin du lien de partage du titre (open.spotify.com/track/<spotifyId>)
  nowPlaying: { title: 'TACTIC', artist: 'Daoko', spotifyId: '2afdDEOkeioSUIwIpx2MPv' }
}
