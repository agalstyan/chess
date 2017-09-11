$(function() {
    var myBoard = new MyChessBoard('board'),
        $statusElement = $('#status'),
        $fenElement = $('#current-fen');

    myBoard.on('board-initialized', function(event, game, board){
        updateCurrentFen(game.fen(), $fenElement);
        updateStatus(game, $statusElement);
    });

    myBoard.init();

    myBoard.on('fen-loaded', function(event, game, board){
        updateCurrentFen(game.fen(), $fenElement);
        updateStatus(game, $statusElement);
        updateCastlings(myBoard.getCastlings());
    });

    $('#apply-fen').click(function(){
        if (!myBoard.loadFEN($('#fen').val())) {
            alert('Wrong fen');

            return false;
        }
    });
});

function updateCastlings(castlings) {
    $.each(castlings, function( color, directions ) {
        $.each(directions, function( direction, isPossible ) {
            $('#castling-' + color + '-' + direction)
                .css('text-decoration', isPossible ? 'none' : 'line-through');
        });
    });
}

function updateCurrentFen(fen, fenElement) {
    fenElement.html(fen);
}

function updateStatus(game, statusElement) {
    var status = '';

    var moveColor = 'White';
    if (game.turn() === 'b') {
        moveColor = 'Black';
    }

    // checkmate?
    if (game.in_checkmate() === true) {
        status = 'Game over, ' + moveColor + ' is in checkmate.';
    }

    // draw?
    else if (game.in_draw() === true) {
        status = 'Game over, drawn position';
    }

    // game still on
    else {
        status = moveColor + ' to move';

        // check?
        if (game.in_check() === true) {
            status += ', ' + moveColor + ' is in check';
        }
    }

    statusElement.html(status);
}
