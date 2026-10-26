// ================================
// DOSSIER A.N.A.N.A.S. - PROGRESSION
// ================================

document.addEventListener("DOMContentLoaded", () => {

    const bouton = document.getElementById("btnMission1");
    const message = document.getElementById("messageMission1");
    const champReponse = document.getElementById("reponseMission1");

    const dossier001 = document.querySelector(".archive.ouverte");

    const progression = document.getElementById("progression");

    const texteProgression =
        progression
            ? progression.parentElement.querySelector("p")
            : null;


    // ========================================
    // RÉCUPÉRATION DE LA PROGRESSION
    // ========================================

    const mission1Terminee =
        localStorage.getItem("ananas_mission1") === "terminee";


    // ========================================
    // RESTAURATION DE LA PROGRESSION
    // ========================================

    if (mission1Terminee) {
        afficherMission1Terminee();
    }


    // ========================================
    // VALIDATION DE LA MISSION 001
    // ========================================

    if (bouton) {

        bouton.addEventListener("click", () => {

            const reponseMission1 =
                champReponse.value.trim().toUpperCase();


            // ====================================
            // BONNE RÉPONSE
            // ====================================

            if (reponseMission1 === "ARCHIVES") {

                // Sauvegarder la mission
                localStorage.setItem(
                    "ananas_mission1",
                    "terminee"
                );


                // Afficher immédiatement le dossier ouvert
                afficherMission1Terminee();


                if (message) {
                    message.textContent =
                        "Accès confirmé. Dossier 001 déverrouillé.";
                }


                // Ouvrir automatiquement le Dossier 001
                window.location.href = "1/dossier-001.html";

            }


            // ====================================
            // MAUVAISE RÉPONSE
            // ====================================

            else {

                if (message) {
                    message.textContent =
                        "ERREUR : Mauvaise réponse, Dossier verrouillé";
                }

            }

        });

    }


    // ========================================
    // AFFICHER LE DOSSIER 001 DÉVERROUILLÉ
    // ========================================

    function afficherMission1Terminee() {

        // ------------------------------------
        // DOSSIER 001
        // ------------------------------------

        if (dossier001) {

            dossier001.innerHTML = `
                📁 Dossier 001

                <p>
                    <a href="1/dossier-001.html">
                        Statut : 🟢 Accès autorisé
                    </a>
                </p>
            `;

        }


        // ------------------------------------
        // PROGRESSION
        // ------------------------------------

        if (progression) {
            progression.value = 5;
        }


        if (texteProgression) {
            texteProgression.textContent =
                "5 % terminé";
        }


        // ------------------------------------
        // NIVEAU D'ACCÈS
        // ------------------------------------

        const informations =
            document.querySelector(".informations");


        if (informations) {

            const paragraphes =
                informations.querySelectorAll("p");


            paragraphes.forEach((p) => {

                if (p.textContent.includes("Niveau d'accès")) {

                    p.innerHTML =
                        "<strong>Niveau d'accès :</strong> Niveau 1 - Autorisé";

                }

            });

        }

    }

});
