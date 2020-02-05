let stats = {
    "totalRep": 0,
    "votedWRep": 0,
    "totalDem": 0,
    "votedWDem": 0,
    "totalInd": 0,
    "votedWInd": 0,
    "totalMembers": 0,
    "leastEngaged": [],
    "mostEngaged": [],
    "leastLoyal": [], 
    "mostLoyal": [],
}

let members = data.results[0].members;

let votesRep = 0;
let votesDem = 0;
let votesInd = 0;
members.forEach(e => {
    if(e.party == "R"){
        stats.totalRep++;
        votesRep += e.votes_with_party_pct;
    }
    else if(e.party == "D"){
        stats.totalDem++;
        votesDem += e.votes_with_party_pct;
    }
    else {
        stats.totalInd++;
        votesInd += e.votes_with_party_pct;
    }
})

stats.totalMembers = stats.totalRep + stats.totalDem + stats.totalInd;
stats.votedWRep = votesRep/stats.totalRep;
stats.votedWDem = votesDem/stats.totalDem;
stats.votedWInd = votesInd/stats.totalInd;

let tenPct = Math.round(stats.totalMembers*0.1);

let tbody = document.querySelector("#table-total>tbody");
let row = tbody.insertRow(-1);
row.innerHTML = `<td>Republican</td><td>${stats.totalRep}</td><td>${(stats.votedWRep).toFixed(2)}%`;
row = tbody.insertRow(-1);
row.innerHTML = `<td>Democrat</td><td>${stats.totalDem}</td><td>${(stats.votedWDem).toFixed(2)}%`;
row = tbody.insertRow(-1);
row.innerHTML = `<td>Independant</td><td>${stats.totalInd}</td><td>${(stats.votedWInd).toFixed(2)}%`;
row = tbody.insertRow(-1);
row.innerHTML = `<td>Total</td><td>${stats.totalMembers}</td><td></td>`;


function compareVotes(memberA, memberB){
    return memberA.missed_votes_pct - memberB.missed_votes_pct;
}

let datosOrd = members.sort(compareVotes);

function addRestTop(index,array){
    let valueAct = datosOrd[index].missed_votes_pct;
    for(let i = index + 1; i < datosOrd.length; i++){
        if(datosOrd[i].missed_votes_pct == valueAct){
            array.push(datosOrd[i]);
        }
    }
}

function addRestBot(index,array){
    let valueAct = datosOrd[index].missed_votes_pct;

}

for(let i = 0; i < tenPct; i++){
    stats.mostEngaged.push(datosOrd[i]);
    if(i == tenPct-1){
        addRestBot(i,stats.mostEngaged);
    }
}

for(let i = datosOrd.length -1; i >= (datosOrd.length - tenPct); i--){
    stats.leastEngaged.push(datosOrd[i]);
    if(i == datosOrd.length - tenPct){}
}

tbody = document.querySelector("#table-least>tbody");
stats.leastEngaged.forEach(member => {
    let row = tbody.insertRow(-1);
    row.innerHTML = `<td>${member.last_name}, ${member.first_name} ${member.middle_name?member.middle_name:""}</td>`
    +`<td>${member.missed_votes}</td><td>${member.missed_votes_pct.toFixed(2)}%</td>`;
})

tbody = document.querySelector("#table-most>tbody");
stats.mostEngaged.forEach(member => {
    let row = tbody.insertRow(-1);
    row.innerHTML = `<td>${member.last_name}, ${member.first_name} ${member.middle_name?member.middle_name:""}</td>`
    +`<td>${member.missed_votes}</td><td>${member.missed_votes_pct.toFixed(2)}%</td>`;
})

