var choice = null;
var idChoice = null;
var score = 0;

function initBoard () {
    var board = $('#board');
    for (var i=0; i<3; i++) {
        var tr = $('<tr></tr>');
        tr.attr('id', i);
        board.append(tr);
        for (var j=0; j<3; j++) {
            var td = $('<td></td>');
            td.attr('id', i + '' + j);
            td.on('click', function() {
                if (choice != null && idChoice != null && $(this).children().length == 0) {
                    var shape = $('<div></div>');
                    shape.attr('class', choice);
                    $(this).append(shape);

                    var shape = $('<div></div>');
                    shape.attr('class', randomizeShape());

                    $(idChoice).find('>:first-child').remove();
                    $(idChoice).append(shape);

                    choice = null;
                    idChoice = null;
                    checkValidity();
                }
            })
            tr.append(td);
        }
    }
}

function initChoices () {
    var shape1 = $('<div></div>');
    shape1.attr('class', randomizeShape());
    $('#choice1').append(shape1);
    $('#choice1').on('click', function() {
        choice = $(this).find('>:first-child').attr('class');
        idChoice = '#choice1';
    });

    var shape2 = $('<div></div>');
    shape2.attr('class', randomizeShape());
    $('#choice2').append(shape2);
    $('#choice2').on('click', function() {
        choice = $(this).find('>:first-child').attr('class');
        idChoice = '#choice2';
    });

    var shape3 = $('<div></div>');
    shape3.attr('class', randomizeShape());
    $('#choice3').append(shape3);
    $('#choice3').on('click', function() {
        choice = $(this).find('>:first-child').attr('class');
        idChoice = '#choice3';
    });
}

function checkValidity () {
    var board = $('#board');
    var shapes = [[],[],[]];

    /* Obtention du tableau des formes */
    for (var i = 0 ; i < 3 ; i++) {
        for (var j = 0 ; j < 3 ; j++) {
            shapes[i][j] = $('#'+i+j).find('>:first-child').attr('class');
            if(shapes[i][j] === undefined) {
                shapes[i][j] = '';
            }
        }
    }

    checkRaws(shapes);
    checkColumns(shapes);
    checkDiagonal1(shapes);
    checkDiagonal2(shapes);
}

function checkRaws (shapes) {
    for (var i = 0 ; i < 3 ; i++) {
        for (var j = 0 ; j < 3 ; j++) {
            if (j == 0) {
                var forme0 = shapes[i][0].charAt(0);
                var forme1 = shapes[i][1].charAt(0);
                var forme2 = shapes[i][2].charAt(0);
                var coul0 = shapes[i][0].charAt(2);
                var coul1 = shapes[i][1].charAt(2);
                var coul2 = shapes[i][2].charAt(2);

                okRaw = checkCriteres(forme0, forme1, forme2, coul0, coul1, coul2);

                if(checkCriteres(forme0, forme1, forme2, coul0, coul1, coul2)) {
                    $('#' + i + '0').find('>:first-child').remove();
                    $('#' + i + '1').find('>:first-child').remove();
                    $('#' + i + '2').find('>:first-child').remove();
                    refreshScore(3);
                }
            }
        }
    }
}

function checkColumns (shapes) {
    for (var i = 0 ; i < 3 ; i++) {
        for (var j = 0 ; j < 3 ; j++) {
            if (i == 0) {
                var forme0 = shapes[0][j].charAt(0);
                var forme1 = shapes[1][j].charAt(0);
                var forme2 = shapes[2][j].charAt(0);
                var coul0 = shapes[0][j].charAt(2);
                var coul1 = shapes[1][j].charAt(2);
                var coul2 = shapes[2][j].charAt(2);

                if(checkCriteres(forme0, forme1, forme2, coul0, coul1, coul2)) {
                    $('#' + '0' + j).find('>:first-child').remove();
                    $('#' + '1' + j).find('>:first-child').remove();
                    $('#' + '2' + j).find('>:first-child').remove();
                    refreshScore(3);
                }
            }
        }
    }
}

function checkDiagonal1 (shapes) {
    var okDiagonal1 = false;

    var forme0 = shapes[0][0].charAt(0);
    var forme1 = shapes[1][1].charAt(0);
    var forme2 = shapes[2][2].charAt(0);
    var coul0 = shapes[0][0].charAt(2);
    var coul1 = shapes[1][1].charAt(2);
    var coul2 = shapes[2][2].charAt(2);

    if(checkCriteres(forme0, forme1, forme2, coul0, coul1, coul2)) {
        $('#00').find('>:first-child').remove();
        $('#11').find('>:first-child').remove();
        $('#22').find('>:first-child').remove();
        refreshScore(3);
    }
}

function checkDiagonal2 (shapes) {
    var okDiagonal2 = false;

    var forme0 = shapes[0][2].charAt(0);
    var forme1 = shapes[1][1].charAt(0);
    var forme2 = shapes[2][0].charAt(0);
    var coul0 = shapes[0][2].charAt(2);
    var coul1 = shapes[1][1].charAt(2);
    var coul2 = shapes[2][0].charAt(2);

    if(checkCriteres(forme0, forme1, forme2, coul0, coul1, coul2)) {
        $('#02').find('>:first-child').remove();
        $('#11').find('>:first-child').remove();
        $('#20').find('>:first-child').remove();
        refreshScore(3);
    }
}

function checkCriteres (forme0, forme1, forme2, coul0, coul1, coul2) {
    /* Vérif. différentes de vide */
    if (forme0 != '' && forme1 != '' && forme2 != '' && coul0 != '' && coul1 != '' && coul2 != '') {
        /* Mêmes formes */
        if (forme0 == forme1
            && forme1 == forme2) {
            /* Mêmes couleurs */
            if (coul0 == coul1 && coul1 == coul2) {
                return true;
            }
            /* Différentes couleurs */
            if(coul0 != coul1 && coul1 != coul2 && coul0 != coul2) {
                return true;
            }
        }
        /* Différentes formes */
        if(forme0 != forme1 && forme1 != forme2 && forme0 != forme2) {
            /* Mêmes couleurs */
            if (coul0 == coul1 && coul1 == coul2) {
                return true;
            }
            /* Différentes couleurs */
            if(coul0 != coul1 && coul1 != coul2 && coul0 != coul2) {
                return true;
            }
        }
    }
    return false;
}

function refreshScore (nb) {
    score += nb;
    $('#score').text(score);
}

function main () {
    initBoard();
    initChoices();
    refreshScore(0);
}

main();
