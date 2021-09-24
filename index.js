const readline = require("readline");
const logUpdate = require("log-update");
const { between, generateRandomSpace } = require("./utils");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.emitKeypressEvents(process.stdin, rl);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

function donnerAManger() {
    state.eat += 25;
}

function donnerABoire() {
    state.drink += 25;
}

function soigner() {
    state.life += 25;
}

function tuer() {
    state.life = -0
    state.drink = -0
    state.eat = -0
}

process.stdin.on("keypress", (character, key) => {
    if (key.name === "up") {
        donnerAManger();
        return;
    }
});

process.stdin.on("keypress", (character, key) => {
    if (key.name === "down") {
        donnerABoire();
        return;
    }
});

process.stdin.on("keypress", (character, key) => {
    if (key.name === "left") {
        soigner();
        return;
    }
});

process.stdin.on("keypress", (character, key) => {
    if (key.name === "right") {
        tuer();
        return;
    }
});

rl.on("close", () => {
    process.exit(0);
});

const bear = ["( ͡⚈ ͜ʖ ͡⚈)", "💪 ( ͡⚈ ͜ʖ ͡⚈) 👊", "( ͡⚈ ͜ʖ ͡⚈҂)👍"];

//Etat
const state = {
    life: 100,
    drink: 100,
    eat: 100,
    time: 0,
};

function getOurs() {
    return generateRandomSpace() + bear[Math.floor(Math.random() * bear.length)];
}

function getLifeBar() {
    if (state.life < 00) {
        return "Je suis mort !   : 💀 " + state.life + " / 100";
    }
    if (state.life < 30) {
        return "Je meure ! : 💖💔💔 " + state.life + " / 100";
    }
    if (state.life < 60) {
        return "Aïe ! : 💖💖💔 " + state.life + " / 100";
    }
    return "Vie: 💖💖💖 " + state.life + " / 100";
}

function getDrinkBar() {
    if (state.drink < 00) {
        return "Je meure de soif ! : 💀   " + state.drink + " /100";
    }
    if (state.drink < 30) {
        return "J ai très soif ! : 🍺  " + state.drink + " / 100";
    }
    if (state.drink < 60) {
        return "J ai soif ! : 🍺🍺  " + state.drink + " / 100";
    }
    return "Soif: 🍺🍺🍺 " + state.drink + " / 100";
}

function getEatBar() {
    if (state.eat < 00) {
        return "Je meure de faim ! : 💀   " + state.eat + " /100";
    }
    if (state.eat < 30) {
        return "J ai très faim ! : 🍗  " + state.eat + " / 100";
    }
    if (state.eat < 60) {
        return "J ai faim ! : 🍗🍗  " + state.eat + " / 100";
    }
    return "Faim: 🍗🍗🍗 " + state.eat + " / 100";
}

setInterval(function () {
    const espace = [getOurs(), "🍗 = UP / 🍺 = DOWN / 💉 = LEFT / 💀 = RIGHT", getLifeBar(), getDrinkBar(), getEatBar()];

    logUpdate(espace.join("\n"));
}, 750);

//boucle d'Etat
setInterval(function () {
    state.time += 1;

    if (state.time % 3 === 0) {
        if (state.eat === 0 && state.drink === 0 && state.life > 0) {
            state.life--;
        }
    }
    if (state.eat > 0 && state.time % 6 === 0) {
        state.eat--;
    }
    if (state.drink > 0 && state.time % 5 === 0) {
        state.drink--;
    }
}, 50);