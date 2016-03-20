var choice = null;
var score = 0;

function initBoard() {
    var board = $('#board');
    for (var i=0; i<3; i++) {
        var tr = $('<tr></tr>');
        tr.attr('id', i);
        board.append(tr);
        for (var j=0; j<3; j++) {
            var td = $('<td></td>');
            td.attr('id', i + '' + j);
            td.on('click', function() {
                if (choice != null && $(this).children().length == 0) {
                    var shape = $('<div></div>');
                    shape.attr('class', choice);
                    $(this).append(shape);

                    var shape = $('<div></div>');
                    shape.attr('class', randomizeShape());

                    if(choice == $('#choice1').find('>:first-child').attr('class')) {
                        $('#choice1').find('>:first-child').remove();
                        $('#choice1').append(shape);
                    } else {
                        $('#choice2').find('>:first-child').remove();
                        $('#choice2').append(shape);
                    }

                    choice = null;
                    checkValidity();
                }
            })
            tr.append(td);
        }
    }
}

function initChoices() {
    var shape1 = $('<div></div>');
    shape1.attr('class', randomizeShape());
    $('#choice1').append(shape1);
    $('#choice1').on('click', function() {
        choice = $(this).find('>:first-child').attr('class');
    });

    var shape2 = $('<div></div>');
    shape2.attr('class', randomizeShape());
    $('#choice2').append(shape2);
    $('#choice2').on('click', function() {
        choice = $(this).find('>:first-child').attr('class');
    });
}

function checkValidity() {
    
}

function main() {
    initBoard();
    initChoices();
    $('#score').text(score);
}

main();
