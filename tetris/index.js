const canvas = document.getElementById("tetris")
const ctx = canvas.getContext('2d')

ctx.scale(20,20)


const matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0],
]

function draw(player) {
    ctx.fillStyle = '#000'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    drawMatrix(player.matrix, player.pos)
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row,y) => {
        row.forEach((value, x) => {
            if (value !==0) {
                ctx.fillStyle = 'red'
                ctx.fillRect(x + offset.x, y + offset.y ,1,1)
            }
        }) 
    })
}

const player = {
    pos : {x:5, y:2},
    matrix : matrix
}

let lastTime     = 0
let dropCounter  = 0
let dropInterval = 1000
function update(time=0) {
    const deltaTime = time - lastTime
    lastTime = time

    dropCounter += deltaTime
    if(dropCounter > dropInterval) {
        player.pos.y++
            dropCounter = 0
    }

    draw(player)
    requestAnimationFrame(update)
}

document.addEventListener('keydown', e => {
    console.log(e)
    if(e.keyCode === 37) {
        player.pos.x--
    }
    if(e.keyCode === 39) {
        player.pos.x++
    }
})

update()

