// gameDummy.js

const DUMMY_DECK = [
    { value: '2', suit: 'Spade' }, { value: '3', suit: 'Spade' }, { value: '4', suit: 'Spade' },
    { value: '5', suit: 'Spade' }, { value: '6', suit: 'Spade' }, { value: '7', suit: 'Spade' },
    { value: '8', suit: 'Spade' }, { value: '9', suit: 'Spade' }, { value: '10', suit: 'Spade' },
    { value: 'J', suit: 'Spade' }, { value: 'Q', suit: 'Spade' }, { value: 'K', suit: 'Spade' }, { value: 'A', suit: 'Spade' },
    { value: '2', suit: 'Heart' }, { value: '3', suit: 'Heart' }, { value: '4', suit: 'Heart' },
    { value: '5', suit: 'Heart' }, { value: '6', suit: 'Heart' }, { value: '7', suit: 'Heart' },
    { value: '8', suit: 'Heart' }, { value: '9', suit: 'Heart' }, { value: '10', suit: 'Heart' },
    { value: 'J', suit: 'Heart' }, { value: 'Q', suit: 'Heart' }, { value: 'K', suit: 'Heart' }, { value: 'A', suit: 'Heart' },
    { value: '2', suit: 'Diamond' }, { value: '3', suit: 'Diamond' }, { value: '4', suit: 'Diamond' },
    { value: '5', suit: 'Diamond' }, { value: '6', suit: 'Diamond' }, { value: '7', suit: 'Diamond' },
    { value: '8', suit: 'Diamond' }, { value: '9', suit: 'Diamond' }, { value: '10', suit: 'Diamond' },
    { value: 'J', suit: 'Diamond' }, { value: 'Q', suit: 'Diamond' }, { value: 'K', suit: 'Diamond' }, { value: 'A', suit: 'Diamond' },
    { value: '2', suit: 'Club' }, { value: '3', suit: 'Club' }, { value: '4', suit: 'Club' },
    { value: '5', suit: 'Club' }, { value: '6', suit: 'Club' }, { value: '7', suit: 'Club' },
    { value: '8', suit: 'Club' }, { value: '9', suit: 'Club' }, { value: '10', suit: 'Club' },
    { value: 'J', suit: 'Club' }, { value: 'Q', suit: 'Club' }, { value: 'K', suit: 'Club' }, { value: 'A', suit: 'Club' }
];

function getShuffledDeck() {
    let deck = [...DUMMY_DECK];
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function getInitialDummyState() {
    const deck = getShuffledDeck();
    return {
        deck: deck.slice(4),
        dealer: [deck[0], deck[1]],
        player: [deck[2], deck[3]],
        dealerTotal: calculateTotal([deck[0], deck[1]]),
        playerTotal: calculateTotal([deck[2], deck[3]])
    };
}

function calculateTotal(cards) {
    let total = 0;
    let aces = 0;
    cards.forEach(card => {
        if (card.value === 'A') {
            aces += 1;
            total += 11;
        } else if (['K', 'Q', 'J'].includes(card.value)) {
            total += 10;
        } else {
            total += parseInt(card.value, 10);
        }
    });
    while (total > 21 && aces > 0) {
        total -= 10;
        aces -= 1;
    }
    return total;
}
