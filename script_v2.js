// Sélection du bouton par son identifiant
const bouton = document.getElementById('btnMission1');
const message = document.getElementById('messageMission1');

// Écoute du clic sur le bouton
bouton.addEventListener('click', () => {
// Sélection de la réponse par son identifiant
let champReponse = document.getElementById("reponseMission1")
let reponseMission1 = champReponse.value
console.log(reponseMission1); // affiche ce qui est contenu dans la balise name
if (reponseMission1 == "ARCHIVE") {
	
	message.textContent = 'Dossier ouvert';
	window.location.href="1/dossier-001.html"
} else { 
	message.textContent = 'ERREUR : Mauvaise réponse, Dossier verrouillé';

}
});


 
            
       
