function getRandomList(count, min, max) {
    return [...Array(count).keys()].map(i => getRandom(min, max));
}

function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

module.exports = {getRandom, getRandomList};