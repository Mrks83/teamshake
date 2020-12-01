import Shake from 'shake.js';

const pupils = [
    { name: 'Adam', socialCompetence: 1, math: 1, sport: 2 },
    { name: 'Berta', socialCompetence: 2, math: 2 },
    { name: 'Celine', socialCompetence: 1, math: 3, sport: 1 },
    { name: 'Doreen', socialCompetence: 2, math: 3, sport: 1 },
    { name: 'Emil', socialCompetence: 4, math: 1, sport: 2 },
    { name: 'Felix' },
    { name: 'Gustav' },
    { name: 'Hans' },
    { name: 'Inge' },
    { name: 'Jörg', socialCompetence: 2, math: 2 },
    { name: 'Karla' },
    { name: 'Line', socialCompetence: 4, math: 1, sport: 2 },
    { name: 'Max' },
    { name: 'Nadine', socialCompetence: 4, math: 1, sport: 2 },
    { name: 'Olaf' },
    { name: 'Petra' },
    { name: 'Stefanie' },
    { name: 'Tom' },
    { name: 'Uli', socialCompetence: 2, math: 2 },
    { name: 'Veronica' },
    { name: 'Xavier', socialCompetence: 2, math: 2 },
    { name: 'Zora' },
];

function chunkIntoTeams(array, numberOfTeams, criteriaFn) {
    
    return teams;
}

class TeamShaker {
    static get teams() {
        return +document.getElementById('numberOfTeams').value;
    }

    static get teamSize() {
        return Math.ceil(pupils.length / this.teams);
    }

    static get skill() {
        return document.getElementById('skill').value;
    }

    static shake() {
        const teamsElement = document.getElementById('teams');

        const teams = [];
        for (let i = 0; i < TeamShaker.teams; i++) {
            teams[i] = [];
        }

        // partition
        pupils.sort((a, b) => {
            if (TeamShaker.skill) {
                const skillScore = (b[TeamShaker.skill] ?? 0) - (a[TeamShaker.skill] ?? 0);
                if (skillScore !== 0) {
                    return skillScore;
                }
            }
            const socialScore = (b.socialCompetence ?? 0) - (a.socialCompetence ?? 0);
            if (socialScore !== 0) {
                return socialScore;
            }

            return Math.random() - Math.random();
        });
        for (let i = 0; i < pupils.length; i++) {
            teams.sort((a, b) => {
                const lVal = a.length - b.length;
                if (lVal !== 0) {
                    return lVal;
                }

                const aScore = a.map((p) => (TeamShaker.skill ? p[TeamShaker.skill] : p.socialCompetence) ?? 0).reduce((x, y) => x + y, 0);
                const bScore = b.map((p) => (TeamShaker.skill ? p[TeamShaker.skill] : p.socialCompetence) ?? 0).reduce((x, y) => x + y, 0);
                const sVal = aScore - bScore;
                if (sVal !== 0) {
                    return sVal;
                }
                
                return Math.random() - Math.random();
            });
            teams[0].push(pupils[i]);
        }

        teamsElement.innerHTML = '';
        teams.forEach((t, i) => {
            teamsElement.innerHTML += `
            <div class="col-6 col-lg-3 mb-3">
                <h5>Team ${i+1}
                <small class="card-text text-muted">Score ${t.map((p) => (TeamShaker.skill ? p[TeamShaker.skill] : p.socialCompetence) ?? 0).reduce((a, c) => a + c )}</small>
                </h5>
                ${t.map((p) => `${p.name} (${(TeamShaker.skill ? p[TeamShaker.skill] : p.socialCompetence) ?? 0})`).join('<br>')}
            </div>
            `;
        });

        console.log(teams);
    }
}

document.getElementById('shake').onclick = () => {
    TeamShaker.shake();
};
