export const backupState = () => {
    return {
        type: 'BACKUP_STATE'
    }
}

export const createLevel = level => {
    return {
        type: 'SET_CURRENT_LEVEL',
        data: { ...level }
    };
};

export const wrongMove = data => {
    return {
        type: 'WRONG_MOVE',
        data: `Wrong move at ${data}`
    };
}

export const continueGame = () => {
    document.getElementById('rewind').play();
    return {
        type: 'CONTINUE_GAME'
    }
}

export const walk = (robot, level) => {
    let step, x, y;
    if (robot.direction.compass === 'north') {
        x = 0;
        y = - 1;
    } else if (robot.direction.compass === 'east') {
        x = 1;
        y = 0;
    } else if (robot.direction.compass === 'south') {
        x = 0;
        y = 1;
    } else if (robot.direction.compass === 'west') {
        x = - 1;
        y = 0;
    }
    let nextField = level[`${Number(robot.position.left.slice(0, 1)) + x}/${Number(robot.position.top.slice(0, 1)) + y}`];
    if (nextField && nextField.every(v => v !== 'hole' && v !== 'asteroid')) {
        document.getElementById(`${robot.name}_walk`) && document.getElementById(`${robot.name}_walk`).play();
        document.getElementById(`${robot.name}_container`) && document.getElementById(`${robot.name}_container`).classList.add('walk');
        step = {
            name: robot.name,
            position: {
                left: `${Number(robot.position.left.slice(0, 1)) + x}0%`,
                top: `${Number(robot.position.top.slice(0, 1)) + y}0%`
            }
        }
    } else {
        return {
            type: 'WRONG_MOVE',
            data: `Wrong move at ${robot.name}'s step to the ${robot.direction.compass}`
        };
    }
    if (nextField && nextField.some(v => v === 'star')) {
        document.getElementById('cash_star').play();
        return {
            type: 'WALK_ON_STAR',
            data: step
        };
    } else if (nextField && nextField.some(v => v === 'rocket')) {
        document.getElementById('close_rocket').play();
        return {
            type: 'WALK_ON_ROCKET',
            data: step
        };
    } else {
        return {
            type: 'WALK',
            data: step
        };
    }
}

const directions = [ 'north', 'east', 'south', 'west' ]

const directionToRotate = (direction, newDirection, currentRotate) => {
    if ((direction === 1 && newDirection === 0) || (direction > newDirection && newDirection > 0) || (direction === 0 && newDirection === 3)) {
        return `rotate(${(Number(currentRotate.slice(7, 11)) - 0.25).toFixed(2)}turn)`;
    } else if (direction < newDirection || (direction === 3 && newDirection === 0)) {
        return `rotate(${(Number(currentRotate.slice(7, 11)) + 0.25).toFixed(2)}turn)`;
    }
}

export const turnLeft = robot => {
    document.getElementById('turn').play();
    const compass = directions[directions.indexOf(robot.direction.compass) - 1] || directions[3];
    const transform = directionToRotate(directions.indexOf(robot.direction.compass), directions.indexOf(compass), robot.direction.transform);
    return {
        type: 'TURN',
        data: {
            name: robot.name,
            direction: {
                compass,
                transform
            }
        }
    }
}

export const turnRight = robot => {
    document.getElementById('turn').play();
    const compass = directions[directions.indexOf(robot.direction.compass) + 1] || directions[0];
    const transform = directionToRotate(directions.indexOf(robot.direction.compass), directions.indexOf(compass), robot.direction.transform);
    return {
        type: 'TURN',
        data: {
            name: robot.name,
            direction: {
                compass,
                transform
            }
        }
    }
}

export const jump = (robot, level) => {
    let jump, x, y, jx, jy;
    if (robot.direction.compass === 'north') {
        x = 0;
        y = - 1;
        jx = 0;
        jy = - 2;
    } else if (robot.direction.compass === 'east') {
        x = 1;
        y = 0;
        jx = 2;
        jy = 0;
    } else if (robot.direction.compass === 'south') {
        x = 0;
        y = 1;
        jx = 0;
        jy = 2;
    } else if (robot.direction.compass === 'west') {
        x = - 1;
        y = 0;
        jx = - 2;
        jy = 0;
    }
    let nextField = level[`${Number(robot.position.left.slice(0, 1)) + x}/${Number(robot.position.top.slice(0, 1)) + y}`];
    let jumpField = level[`${Number(robot.position.left.slice(0, 1)) + jx}/${Number(robot.position.top.slice(0, 1)) + jy}`];
    if (jumpField && jumpField.every(v => v !== 'hole' && v !== 'asteroid' && v !== 'rob') && nextField && nextField.every(v => v !== 'asteroid')) {
        document.getElementById('lisa_jump').play();
        jump = {
            name: robot.name,
            position: {
                left: `${Number(robot.position.left.slice(0, 1)) + jx}0%`,
                top: `${Number(robot.position.top.slice(0, 1)) + jy}0%`
            }
        }
    } else {
        return {
            type: 'WRONG_MOVE',
            data: `Wrong move at ${robot.name}'s jump to the ${robot.direction.compass}`
        };
    }
    return {
        type: 'JUMP',
        data: jump || { ...robot }
    };
}

export const hammer = (robot, level) => {
    let hitAsteroid, x, y;
    if (robot.direction.compass === 'north') {
        x = 0;
        y = - 1;
    } else if (robot.direction.compass === 'east') {
        x = 1;
        y = 0;
    } else if (robot.direction.compass === 'south') {
        x = 0;
        y = 1;
    } else if (robot.direction.compass === 'west') {
        x = - 1;
        y = 0;
    }
    let nextKey = `${Number(robot.position.left.slice(0, 1)) + x}/${Number(robot.position.top.slice(0, 1)) + y}`;
    let nextField = level[nextKey];
    if (nextField && nextField.some(v => v === 'asteroid')) {
        document.getElementById('break_asteroid').play();
        hitAsteroid = nextKey;
    } else {
        document.getElementById('empty_swing').play();
    }
    return {
        type: 'HAMMER',
        data: hitAsteroid
    }
}

export const ignite = rocket => {
    document.getElementById('lisa_walk').pause();
    let ignition;
    if (rocket.lisa && rocket.rob && rocket.star) {
            document.getElementById('launch_rocket').play();
            ignition = true;
        }
    return {
        type: 'IGNITE',
        data: ignition
    }
}
