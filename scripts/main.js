var choice = null;
var idChoice = null;
var score = 0;
var shapesToRemove = [];

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
                    var shape = $('<img></img>');
                    shape.attr('class', choice);
                    shape.attr('src', 'images/' + choice + '.png');
                    $(this).append(shape);

                    var shape = $('<img></img>');
                    var randomShape = randomizeShape();
                    shape.attr('class', randomShape);
                    shape.attr('src', 'images/' + randomShape + '.png');

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

    $('#replay').on('click', function() {
        replay();
    });
}

function initChoices () {
    var shape1 = $('<img></img>');
    var randomShape1 = randomizeShape();
    shape1.attr('class', randomShape1);
    shape1.attr('src', 'images/' + randomShape1 + '.png');
    $('#choice1').append(shape1);
    $('#choice1').on('click', function() {
        choice = $(this).find('>:first-child').attr('class');
        idChoice = '#choice1';
    });

    var shape2 = $('<img></img>');
    var randomShape2 = randomizeShape();
    shape2.attr('class', randomShape2);
    shape2.attr('src', 'images/' + randomShape2 + '.png');
    $('#choice2').append(shape2);
    $('#choice2').on('click', function() {
        choice = $(this).find('>:first-child').attr('class');
        idChoice = '#choice2';
    });

    var shape3 = $('<img></img>');
    var randomShape3 = randomizeShape();
    shape3.attr('class', randomShape3);
    shape3.attr('src', 'images/' + randomShape3 + '.png');
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
    removeShapes();
}

function removeShapes() {
    for (var i = 0 ; i < shapesToRemove.length ; i++) {
        $(shapesToRemove[i]).find('>:first-child').remove();
    }
    refreshScore(shapesToRemove.length);
    shapesToRemove = [];
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
                    shapesToRemove.push('#' + i + '0');
                    shapesToRemove.push('#' + i + '1');
                    shapesToRemove.push('#' + i + '2');
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
                    shapesToRemove.push('#' + '0' + j);
                    shapesToRemove.push('#' + '1' + j);
                    shapesToRemove.push('#' + '2' + j);
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
        shapesToRemove.push('#00');
        shapesToRemove.push('#11');
        shapesToRemove.push('#22');
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
        shapesToRemove.push('#02');
        shapesToRemove.push('#11');
        shapesToRemove.push('#20');
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
            if (coul0 != coul1 && coul1 != coul2 && coul0 != coul2) {
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

function replay() {
    $('#board tr').remove();
    initBoard();
    $('#choice1').find('>:first-child').remove();
    $('#choice2').find('>:first-child').remove();
    $('#choice3').find('>:first-child').remove();
    initChoices();
    score = 0;
    $('#score').text(score);
}

function main () {
    initBoard();
    initChoices();
    refreshScore(0);
}

main();
