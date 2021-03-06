var MyChessBoard = function(boardId){
    var board,
        game = new Chess(),
        $board = $('#' + boardId),
        castlings = {"white": {"king": true, "queen": true}, "black": {"king": true, "queen": true}};

    var onDragStart = function(source, piece, position, orientation) {
        if (game.game_over() === true ||
            (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }

        $board.trigger('drag-started', [game, board]);
    };

    var onDrop = function(source, target) {
        // see if the move is legal
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) {
            $board.trigger('dropped', [game, board]);

            return 'snapback';
        }

        $board.trigger('dropped', [game, board]);
    };

    // update the board position after the piece snap
    // for castling, en passant, pawn promotion
    var onSnapEnd = $.proxy(function() {
        this.loadFEN(game.fen());
        $board.trigger('snap-end', [game, board]);
    }, this);

    var stringContains = function (haystack, needle) {
        return haystack.indexOf(needle) > -1;
    };

    this.init = function() {
        var cfg = {
            draggable: true,
            position: 'start',
            onDragStart: onDragStart,
            onDrop: onDrop,
            onSnapEnd: onSnapEnd
        };
        board = ChessBoard(boardId, cfg);

        $board.trigger('board-initialized', [game, board]);
    };

    this.loadFEN = function(fen) {
        if (!game.load(fen)) {
            return false;
        }

        board.position(fen);

        // get castlings part of fen string
        var fenParts = fen.split(" ");
        var fenCastlings = fenParts[2];

        // parse castlings
        castlings.white.king = stringContains(fenCastlings, 'K');
        castlings.white.queen = stringContains(fenCastlings, 'Q');
        castlings.black.king = stringContains(fenCastlings, 'k');
        castlings.black.queen = stringContains(fenCastlings, 'q');

        $board.trigger('fen-loaded', [game, board]);

        return true;
    };

    this.getCastlings = function() {
        return castlings;
    };

    this.on = function(event, callback) {
        $board.on(event, callback);
    }
};
