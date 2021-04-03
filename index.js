const set_image = (row, col, r, c) => {
    const app = document.querySelector('.app');
    const eles = app.querySelectorAll('div');
    eles[3*row + col].style.setProperty('--row', r);
    eles[3*row + col].style.setProperty('--col', c);
}

const state = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
]

const render = () => {
    for(let row=0; row<state.length; row++)
        for(let col=0; col<state[row].length; col++) {
            const val = state[row][col];
            if(val===8) {
                set_image(row, col, 5, 5);
            } else {
                const r = parseInt(val/3);
                const c = val%3;
                set_image(row, col, r, c);
            }
        }
}

render();

const change_and_render = (row, col, val) => {
    state[row][col] = val;
    render();
}

let col = 2;
let row = 2;

const is_game_over = () => {
    for(let row=0; row<state.length; row++)
        for(let col=0; col<state[row].length; col++) {
            const val = 3*row + col;
            if(state[row][col] !== val) return false;
        }
    return true;
}

let check_game_over = false;

const move = (delta_col, delta_row) => {
    const new_col = col + delta_col;
    const new_row = row + delta_row;
    if(new_col < 0 || new_col > 2 || new_row < 0 || new_row>2) return;
    const tmp = state[row][col];
    state[row][col] = state[new_row][new_col];
    state[new_row][new_col] = tmp;
    row = new_row;
    col = new_col;
    render()
    if(check_game_over && is_game_over()) alert('Be happy, Myo!');
}

const move_up = () => move(0, -1);
const move_down = () => move(0, 1);
const move_left = () => move(-1, 0);
const move_right = () => move(1, 0);

window.addEventListener('keydown', e => {
    e.preventDefault();
    const key = e.key;
    const tt = {
        "ArrowUp": move_up,
        "ArrowDown": move_down,
        "ArrowLeft": move_left,
        "ArrowRight": move_right,
    }
    const f = tt[key];
    if(f) f();
})

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const suffle_div = () => {
    const fs = [move_up, move_down, move_left, move_right]
    for(let i=0; i < 5; i++) {
        const f = fs[getRndInteger(0, 3)];
        if(f) f();
    }
}

while(is_game_over()) {
    suffle_div();
}

check_game_over = true;

const addClick = () => {
    const app = document.querySelector('.app');
    const eles = app.querySelectorAll('div');
    for(let i=0; i<eles.length; i++) {
        eles[i].addEventListener('click', () => {
            const current = 3*row+col;
            const delta = current - i;
            const obj = {
                "3": move_up,
                "-3": move_down,
                "1": move_left,
                "-1": move_right
            }
            const f = obj[delta];
            if(f) f();
        })
    }
}

addClick();