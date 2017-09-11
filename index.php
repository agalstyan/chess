<html>
    <head>
        <link rel="stylesheet" href="css/bootstrap.min.css" />
        <link rel="stylesheet" href="css/chessboard-0.3.0.min.css" />

        <style>
            body {
                padding-top: 20px;
                padding-bottom: 20px;
            }
        </style>

        <script type="application/javascript" src="js/jquery-3.2.1.min.js"></script>
        <script type="application/javascript" src="js/bootstrap.min.js"></script>
        <script type="application/javascript" src="js/chessboard-0.3.0.min.js"></script>
        <script type="application/javascript" src="js/chess.min.js"></script>
        <script type="application/javascript" src="js/mychessboard.js"></script>
        <script type="application/javascript" src="js/main.js"></script>
    </head>
    <body class="bg-light">
        <div class="container">
            <div class="col-sm-12 mx-auto">
                <div class="row">
                    <div class="col-7">
                        <div class="card mb-2">
                            <div class="card-body">
                                <div id="board" class="align-self-center" style="width: 500px; margin: auto;"></div>
                            </div>
                        </div>
                        <p id="current-fen" class="text-muted text-center" style="font-size: 0.85rem"></p>
                    </div>
                    <div class="col">
                        <form class="mb-2">
                            <div class="form-row">
                                <div class="form-group col-md-10 mb-0">
                                    <input class="form-control" id="fen" placeholder="Enter a FEN string" aria-describedby="fenHelpBlock">
                                </div>
                                <div class="form-group mb-0">
                                    <input type="button" class="btn btn-success" id="apply-fen" value="Apply" />
                                </div>
                            </div>
                        </form>

                        <div class="card mb-2">
                            <div class="card-header">Status</div>
                            <div class="card-body">
                                <p class="card-text"><span id="status"></span></p>
                            </div>
                        </div>

                        <div class="card mb-2">
                            <div class="card-header">Available Castlings</div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                        <p class="font-weight-bold">Whites</p>
                                        <p id="castling-white-king">King direction</p>
                                        <p id="castling-white-queen">Queen direction</p>
                                    </div>
                                    <div class="col">
                                        <p class="font-weight-bold">Blacks</p>
                                        <p id="castling-black-king">King direction</p>
                                        <p id="castling-black-queen">Queen direction</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
