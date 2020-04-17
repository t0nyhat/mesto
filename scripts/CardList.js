class CardList {
  constructor(container, cards) {
    this.container = container;
    this.cards = cards;
  }

  render() {
    this.cards.forEach(e => this.container.appendChild(e.cardElement));
  }

  addCard(card) {
    card.setEventListeners(this.container);
    this.container.appendChild(card.cardElement);
  }
}
