/* ==========================================
   DOSSIER A.N.A.N.A.S
   Gestion des missions et de la progression
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       CONFIGURATION DES MISSIONS
    ====================================== */

    const missions = [
        { numero: "001", date: "2026-10-15", reponse: "ARCHIVES", lien: "1/dossier-001.html" },
        { numero: "002", date: "2026-11-15", reponse: "R", lien: "2/dossier-002.html" },
        { numero: "003", date: "2026-12-15" },
        { numero: "004", date: "2027-01-15" },
        { numero: "005", date: "2027-02-15" },
        { numero: "006", date: "2027-03-15" },
        { numero: "007", date: "2027-04-15" },
        { numero: "008", date: "2027-05-15" },
        { numero: "009", date: "2027-06-15" },
        { numero: "010", date: "2027-07-15" },
        { numero: "011", date: "2027-09-15" },
        { numero: "012", date: "2027-10-15" }
    ];

    /* ======================================
       ÉLÉMENTS HTML
    ====================================== */

    const dossierActuel = document.getElementById("dossier-actuel");
    const niveauAcces = document.getElementById("niveau-acces");

    const progression = document.getElementById("progression");
    const texteProgression = progression?.parentElement?.querySelector("p");

    const btnMission1 = document.getElementById("btnMission1");
    const champMission1 = document.getElementById("reponseMission1");
    const messageMission1 = document.getElementById("messageMission1");

    const btnMission2 = document.getElementById("btnMission2");
    const champMission2 = document.getElementById("reponseMission2");
    const messageMission2 = document.getElementById("messageMission2");

    /* ======================================
       SAUVEGARDE
    ====================================== */

    function missionTerminee(numero) {
        try {
            return localStorage.getItem("ananas_mission" + numero) === "terminee";
        } catch (erreur) {
            console.error("Erreur de lecture de la progression :", erreur);
            return false;
        }
    }

    function sauvegarderMission(numero) {
        try {
            localStorage.setItem("ananas_mission" + numero, "terminee");
            return true;
        } catch (erreur) {
            console.error("Erreur de sauvegarde :", erreur);
            return false;
        }
    }

    /* ======================================
       DATES ET DISPONIBILITÉ
    ====================================== */

    function dateAtteinte(mission) {
        const aujourdHui = new Date();
        aujourdHui.setHours(0, 0, 0, 0);

        const dateMission = new Date(mission.date + "T00:00:00");

        return aujourdHui >= dateMission;
    }

    function missionAccessible(index) {

        if (index === 0) {
            return dateAtteinte(missions[index]);
        }

        return (
            dateAtteinte(missions[index]) &&
            missionTerminee(missions[index - 1].numero)
        );
    }

    /* ======================================
       CALCUL DE LA PROGRESSION
    ====================================== */

    function afficherProgression() {

        const total = missions.length;

        const terminees = missions.filter(mission =>
            missionTerminee(mission.numero)
        ).length;

        const pourcentage = Math.round((terminees / total) * 100);

        if (progression) {
            progression.value = pourcentage;
        }

        if (texteProgression) {
            texteProgression.textContent = pourcentage + " % terminé";
        }
    }

    /* ======================================
       AFFICHAGE DU DOSSIER ACTUEL
    ====================================== */

    function afficherDossierActuel() {

        let prochainIndex = missions.findIndex((mission, index) =>
            !missionTerminee(mission.numero) && missionAccessible(index)
        );

        if (prochainIndex === -1) {
            prochainIndex = missions.findIndex(mission =>
                !missionTerminee(mission.numero)
            );
        }

        if (dossierActuel) {
            dossierActuel.textContent =
                prochainIndex === -1
                    ? "012"
                    : missions[prochainIndex].numero;
        }

        if (niveauAcces) {
            const terminees = missions.filter(mission =>
                missionTerminee(mission.numero)
            ).length;

            niveauAcces.textContent =
                terminees === missions.length
                    ? "Toutes les missions terminées"
                    : "Niveau " + (terminees + 1);
        }
    }

    /* ======================================
       AFFICHAGE DES DOSSIERS
    ====================================== */

    function afficherDossiers() {

        missions.forEach((mission, index) => {

            const dossier = document.querySelector(
                `.dossier-${mission.numero}`
            );

            if (!dossier) return;

            const termine = missionTerminee(mission.numero);
            const accessible = missionAccessible(index);

            dossier.classList.toggle("termine", termine);
            dossier.classList.toggle("accessible", accessible);
            dossier.classList.toggle("verrouille", !accessible );

            const lien = dossier.querySelector("a");

            if (lien) {
                if (termine && mission.lien) {
                    lien.href = mission.lien ;
                   lien.textContent = "Consulter le dossier";
                   lien.style.pointerEvents = "auto";
                } else if{
                   lien.href = mission.lien;
                   lien.textContent = "Accéder au dossier";
                   lien.style.pointerEvents = "auto";
                }else{
                   lien.removeAttribute("href");
                   lien.textContent = "Acces Refusé ";
                   lien.style.pointerEvents = "auto";

                }
            }
        });
    }

    /* ======================================
       VALIDATION D'UNE MISSION
    ====================================== */

    function validerMission(numero, champ, message, bouton) {

        if (!champ || !message || !bouton) return;

        const mission = missions.find(m => m.numero === numero);

        if (!mission || !mission.reponse) return;

        const index = missions.indexOf(mission);

        if (!missionAccessible(index)) {
            message.textContent = "Cette mission n'est pas encore accessible.";
            return;
        }

        const reponse = champ.value.trim().toUpperCase();

        if (reponse === mission.reponse) {

            if (!sauvegarderMission(numero)) {
                message.textContent =
                    "Impossible de sauvegarder la progression.";
                return;
            }

            message.textContent = "Réponse correcte. Accès autorisé.";

            champ.disabled = true;
            bouton.disabled = true;

            afficherTout();

            setTimeout(() => {
                if (mission.lien) {
                    window.location.href = mission.lien;
                }
            }, 1000);

        } else {
            message.textContent = "Réponse incorrecte. Réessayez.";
            champ.value = "";
            champ.focus();
        }
    }

    /* ======================================
       AFFICHAGE D'UNE MISSION TERMINÉE
    ====================================== */

    function restaurerMission(numero, champ, message, bouton) {

        if (!missionTerminee(numero)) return;

        if (champ) champ.disabled = true;
        if (bouton) bouton.disabled = true;

        if (message) {
            message.textContent = "Mission déjà validée.";
           
        }
    }

    /* ======================================
       MISE À JOUR GÉNÉRALE
    ====================================== */

    function afficherTout() {
        afficherProgression();
        afficherDossierActuel();
        afficherDossiers();
    }

    /* ======================================
       ÉVÉNEMENTS
    ====================================== */

    btnMission1?.addEventListener("click", () => {
        validerMission(
            "001",
            champMission1,
            messageMission1,
            btnMission1
        );
    });

    btnMission2?.addEventListener("click", () => {
        validerMission(
            "002",
            champMission2,
            messageMission2,
            btnMission2
        );
    });

    champMission1?.addEventListener("keydown", evenement => {
        if (evenement.key === "Enter") {
            btnMission1?.click();
        }
    });

    champMission2?.addEventListener("keydown", evenement => {
        if (evenement.key === "Enter") {
            btnMission2?.click();
        }
    });

    /* ======================================
       INITIALISATION
    ====================================== */

    restaurerMission(
        "001",
        champMission1,
        messageMission1,
        btnMission1
    );

    restaurerMission(
        "002",
        champMission2,
        messageMission2,
        btnMission2
    );

    afficherTout();

});
