const classes = [ 'path', 'hole', 'blue', 'red', 'gold', 'jump', 'star', 'asteroid', 'monster', 'lisa', 'rob', 'rocket' ];

const rotates = { north: 'rotate(2.50turn)', east: 'rotate(2.75turn)', south: 'rotate(2.00turn)', west: 'rotate(2.25turn)' }

// 0: path
// 1: hole
// 2: blue
// 3: red
// 4: gold
// 5: jump
// 6: star
// 7: asteroid
// 8: monster
// 9: lisa
// 10: rob
// 11: rocket

const levels = [
    {
        gameField: {
            '4/3': [ 0, 9 ],
            '4/4': [ 0 ],
            '4/5': [ 0 ],
            '4/6': [ 0, 6 ]
        },
        lisa: 'south'
    },
    {
        gameField: {
            '1/4': [ 0, 9 ],
            '2/2': [ 0, 7 ],
            '2/4': [ 1 ],
            '3/2': [ 0 ],
            '3/4': [ 0 ],
            '4/7': [ 0, 11 ],
            '4/6': [ 0 ],
            '4/5': [ 0 ],
            '4/1': [ 0, 10 ],
            '4/2': [ 0 ],
            '4/3': [ 0 ],
            '4/4': [ 0, 7 ],
            '5/4': [ 0 ],
            '6/4': [ 1 ],
            '7/6': [ 0, 6 ],
            '7/5': [ 0 ],
            '7/4': [ 0 ]
        },
        lisa: 'east',
        rob: 'south',
        rocket: true
    }
];

const blueprintCHAR = (name, direction, xy) => {
    return {
        name,
        direction: {
            compass: direction,
            transform: rotates[direction]
        },
        position: {
            left: xy[0],
            top: xy[1]
        }
    }
}

const getXY = (char, level) => {
    let field = Object.keys(level).filter(v => level[v].some(v => v === char));
    if (field[0]) {
        return [
            `${field[0].slice(0, 1)}0%`,
            `${field[0].slice(2, 3)}0%`
        ]
    } else {
        return [ '10%', '10%' ]
    }
}

const constructCHAR = level => {
    let lisa, rob, rocket;
    if (level.lisa) {
        lisa = blueprintCHAR('lisa', level.lisa, getXY(9, level.gameField));
    }
    if (level.rob) {
        rob = blueprintCHAR('rob', level.rob, getXY(10, level.gameField));
    }
    if (level.rocket) {
        rocket = blueprintCHAR('rocket', level.rocket, getXY(11, level.gameField));
        rocket.direction = 0;
    }
    return {
        lisa,
        rob,
        rocket
    }
}

const compileLevel = level => {
    const currentLevel = {};
    const characters = constructCHAR(levels[level]);
    Object.keys({ ...levels[level].gameField })
          .forEach(v => currentLevel[v] = levels[level].gameField[v]
              .map(v => classes[v]));
    return {
        gameField: currentLevel,
        ...characters
    }
};

export default compileLevel;
