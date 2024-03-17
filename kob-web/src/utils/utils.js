export const stringTo2D = map => {
    let g = [];
    for (let i = 0, k = 0; i < 13; i ++ ) {
        let line = [];
        for (let j = 0; j < 14; j ++, k ++ ) {
            if (map[k] === '0') line.push(0);
            else line.push(1);
        }
        g.push(line);
    }
    return g;
}