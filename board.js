class Board {
  constructor(layout) {
    this.layout = layout;
  }
  getLayout() {
    return this.layout;
  }
  addPiece(x, y, color) {
    this.layout[x][y] = color;
  }
}
