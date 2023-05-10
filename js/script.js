const cards = document.querySelectorAll('.memory-card');

let hasFlipedCard = false
let lockBoard = false
let firstCard, secondCard

function flipCard() {
    if (lockBoard) return
    if (this === firstCard) return

    this.classList.add('flip');

    if (!hasFlipedCard) {
        hasFlipedCard = true;
        firstCard = this;

        return
    }

    secondCard = this

    checkForMatch()

}

function checkForMatch() {
    let isMatch = firstCard.dataset.player === secondCard.dataset.player

    isMatch ? disableCard() : unflipCards()
}

function disableCard() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}


function unflipCards() {
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()
    }, 1500)
}

function resetBoard() {
    [hasFlipedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPas = Math.floor(Math.random() * 12)
        card.style.order = randomPas
    })
})()

cards.forEach(card => card.addEventListener('click', flipCard));