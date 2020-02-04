let stats = {
    "totalRep": 0,
    "votedWRep": 0,
    "totalDem": 0,
    "votedWDem": 0,
    "totalInd": 0,
    "votedWInd": 0, 
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

stats.votedWRep = votesRep/stats.totalRep;
stats.votedWDem = votesDem/stats.totalDem;
stats.votedWInd = votesInd/stats.totalInd;

let table = document.querySelector("#table-total");
let tbody = document.querySelector("tbody");



