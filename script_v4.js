
// ================================
// DOSSIER A.N.A.N.A.S. - PROGRESSION
// ================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // ÉLÉMENTS HTML
    // ========================================

    const dossierActuel =
        document.getElementById("dossier-actuel");

    const niveauAcces =
        document.getElementById("niveau-acces");

    const progression =
        document.getElementById("progression");

    const texteProgression =
        progression
            ? progression.parentElement.querySelector("p")
            : null;

    // MISSION 001
    const bouton =
        document.getElementById("btnMission1");

    const message =
        document.getElementById("messageMission1");

    const champReponse =
        document.getElementById("reponseMission1");

    // MISSION 002
    const bouton2 =
        document.getElementById("btnMission2");

    const message2 =
        document.getElementById("messageMission2");

    const champReponse2 =
        document.getElementById("reponseMission2");

    // DOSSIERS
    const dossier001 =
        document.querySelector(".archive.dossier001");

    const dossier002 =
        document.querySelector(".archive.dossier002");


    // ========================================
    // CALENDRIER DES MISSIONS
    // ========================================

    const missions = [
        { numero: "001", date: "2026-10-15", niveau: 1 },
        { numero: "002", date: "2026-11-15", niveau: 2 },
        { numero: "003", date: "2026-12-15", niveau: 3 },
        { numero: "004", date: "2027-01-15", niveau: 4 },
        { numero: "005", date: "2027-02-15", niveau: 5 },
        { numero: "006", date: "2027-03-15", niveau: 6 },
        { numero: "007", date: "2027-04-15", niveau: 7 },
        { numero: "008", date: "2027-05-15", niveau: 8 },
        { numero: "009", date: "2027-06-15", niveau: 9 },
        { numero: "010", date: "2027-07-15", niveau: 10 },
        { numero: "011", date: "2027-09-15", niveau: 11 },
        { numero: "012", date: "2027-10-15", niveau: 12 }
    ];


    // ========================================
    // DATE DU JOUR
    // ========================================

    const aujourdHui = new Date();


    // ========================================
    // VÉRIFIER SI UNE MISSION EST TERMINÉE
    // ========================================

    function missionTerminee(numero) {

        return localStorage.getItem(
            "ananas_mission" + numero
        ) === "terminee";

    }


    // ========================================
    // COMPTER LES MISSIONS TERMINÉES
    // ========================================

    function compterMissionsTerminees() {

        let compteur = 0;

        missions.forEach((mission) => {

            if (missionTerminee(mission.numero)) {
                compteur++;
            }

        });

        return compteur;

    }


    // ========================================
    // DÉTERMINER LE DOSSIER ACTUEL
    // ========================================

    function determinerMissionActuelle() {

        let missionActuelle = null;

        for (let i = 0; i < missions.length; i++) {

            const mission = missions[i];

            const dateMission =
                new Date(mission.date + "T00:00:00");

            if (aujourdHui >= dateMission) {

                if (i === 0) {

                    missionActuelle = mission;

                }

                else if (
                    missionTerminee(
                        missions[i - 1].numero
                    )
                ) {

                    missionActuelle = mission;

                }

            }

        }

        return missionActuelle;

    }


    // ========================================
    // AFFICHER LA PROGRESSION
    // ========================================

    function afficherProgression() {

        const nombreTerminees =
            compterMissionsTerminees();

        const totalMissions =
            missions.length;

        const pourcentage =
            Math.round(
                (nombreTerminees / totalMissions) * 100
            );

        if (progression) {

            progression.value = pourcentage;

        }

        if (texteProgression) {

            texteProgression.textContent =
                pourcentage + " % terminé";

        }

    }


    // ========================================
    // AFFICHER LE DOSSIER ACTUEL
    // ========================================

    function afficherDossierActuel() {

        const mission =
            determinerMissionActuelle();

        if (!mission) {

            if (dossierActuel) {
                dossierActuel.textContent = "---";
            }

            if (niveauAcces) {
                niveauAcces.textContent = "Aucun accès";
            }

            return;

        }

        if (dossierActuel) {

            dossierActuel.textContent =
                mission.numero;

        }

        if (niveauAcces) {

            niveauAcces.textContent =
                "Niveau " +
                mission.niveau +
                " - Autorisé";

        }

    }


    // ========================================
    // AFFICHER LE DOSSIER 001
    // ========================================

    function afficherMission1Terminee() {

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

    }


    // ========================================
    // AFFICHER LE DOSSIER 002
    // ========================================

    function afficherMission2Terminee() {

        if (dossier002) {

            dossier002.innerHTML = `
                📁 Dossier 002

                <p>
                    <a href="2/dossier-002.html">
                        Statut : 🟢 Accès autorisé
                    </a>
                </p>
            `;

        }

    }


    // ========================================
    // INITIALISATION
    // ========================================

    afficherDossierActuel();

    afficherProgression();


    // ========================================
    // RESTAURATION MISSION 001
    // ========================================

    if (missionTerminee("001")) {

        afficherMission1Terminee();

    }


    // ========================================
    // RESTAURATION MISSION 002
    // ========================================

    if (missionTerminee("002")) {

        afficherMission2Terminee();

    }


    // ========================================
    // VALIDATION MISSION 001
    // ========================================

    if (bouton) {

        bouton.addEventListener("click", () => {

            const reponseMission1 =
                champReponse.value
                    .trim()
                    .toUpperCase();

            if (reponseMission1 === "ARCHIVES") {

                localStorage.setItem(
                    "ananas_mission001",
                    "terminee"
                );

                afficherMission1Terminee();

                afficherDossierActuel();

                afficherProgression();

                if (message) {

                    message.textContent =
                        "Accès confirmé. Dossier 001 déverrouillé.";

                }

                window.location.href =
                    "1/dossier-001.html";

            }

            else {

                if (message) {

                    message.textContent =
                        "ERREUR : Mauvaise réponse, Dossier verrouillé";

                }

            }

        });

    }


    // ========================================
    // VALIDATION MISSION 002
    // ========================================

    if (bouton2) {

        bouton2.addEventListener("click", () => {

            const reponseMission2 =
                champReponse2.value
                    .trim()
                    .toUpperCase();

            if (reponseMission2 === "R") {

                localStorage.setItem(
                    "ananas_mission002",
                    "terminee"
                );

                afficherMission2Terminee();

                afficherDossierActuel();

                afficherProgression();

                if (message2) {

                    message2.textContent =
                        "Accès confirmé. Dossier 002 déverrouillé.";

                }

                window.location.href =
                    "2/dossier-002.html";

            }

            else {

                if (message2) {

                    message2.textContent =
                        "ERREUR : Mauvaise réponse, Dossier verrouillé";

                }

            }

        });

    }

});
