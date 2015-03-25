(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    this.$el.on('click', '.square', (function (myEvent) {
      var $square = $(myEvent.currentTarget);
      try {
        this.makeMove($square);
      } catch(err) {
        alert("Invalid move!");
      }

      if (this.game.isOver()) {
        if (this.game.winner() === null) {
          alert('Game was a draw!');
        } else {
          alert(this.game.winner() + " wins!")
        }
        this.newGame();
      }
    }).bind(this));
  };

  View.prototype.makeMove = function ($square) {
    var cellid = $square.data('cellid');
    var pos = [Math.floor((cellid / 3)), cellid % 3];
    var mark = this.game.currentPlayer;
    this.game.playMove(pos);
    $square.html(mark);
  };

  View.prototype.setupBoard = function () {
    for (var i = 0; i < 3; i++) {
      this.addRow(i);
    }
  };

  View.prototype.newGame = function () {
    this.game = new TTT.Game();
    $('.square').html('');
  };

  View.prototype.addRow = function (row) {
    var rowString ="";
    for (var i = 0; i < 3; i++) {
      rowString += "<div class='square' data-cellid=\"" + (row*3 + i) + "\"></div>";
    }
    this.$el.append("<div class='row'>" + rowString + "</div>");
  };
})();
