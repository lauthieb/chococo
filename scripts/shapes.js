var shapes = ['c-w', 's-w', 't-w', 'c-m', 's-m', 't-m', 'c-b', 's-b', 't-b'];

function randomizeShape() {
    return shapes[Math.floor(Math.random()*shapes.length)];
}
