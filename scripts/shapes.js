var shapes = ['c-b', 's-b', 't-b', 'c-y', 's-y', 't-y', 'c-r', 's-r', 't-r'];

function randomizeShape() {
    return shapes[Math.floor(Math.random()*shapes.length)];
}
