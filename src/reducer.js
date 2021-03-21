let backupState;

const reducer = (state = {}, action) => {
    const removeCHAR = char => {
        const newGameField = { ...state.gameField };
        const starFieldKey = Object.keys(newGameField).filter(v => newGameField[v].some(v => v === char));
        const newField = [ ...newGameField[starFieldKey] ];
        newField.splice(newGameField[starFieldKey].indexOf(char), 1);
        newGameField[starFieldKey] = newField;
        return newGameField;
    }
    if (action.type === 'BACKUP_STATE') {
        backupState = state;
        return {
            ...state
        }
    }
    if (action.type === 'SET_CURRENT_LEVEL') {
        return {
            ...state,
            gameField: action.data.gameField,
            lisa: action.data.lisa,
            rob: action.data.rob,
            rocket: action.data.rocket
        }
    }
    if (action.type === 'WRONG_MOVE') {
        return {
            ...state,
            wrongMove: action.data
        }
    }
    if (action.type === 'CONTINUE_GAME') {
        return {
            ...backupState
        }
    }
    if (action.type === 'WALK') {
        if (action.data.name === 'lisa') {
            return {
                ...state,
                lisa: {
                    ...state.lisa,
                    position: action.data.position
                }
            }
        }
        if (action.data.name === 'rob') {
            return {
                ...state,
                rob: {
                    ...state.rob,
                    position: action.data.position
                }
            }
        }
    }
    if (action.type === 'WALK_ON_STAR') {
        const newGameField = removeCHAR('star');
        if (action.data.name === 'lisa') {
            return {
                ...state,
                lisa: {
                    ...state.lisa,
                    position: action.data.position,
                    star: true
                },
                gameField: { ...newGameField }
            }
        }
        if (action.data.name === 'rob') {
            return {
                ...state,
                rob: {
                    ...state.rob,
                    position: action.data.position,
                    star: true
                },
                gameField: { ...newGameField }
            }
        }
    }
    if (action.type === 'WALK_ON_ROCKET') {
        if (action.data.name === 'lisa') {
            const newGameField = removeCHAR('lisa');
            const star = state.lisa.star;
            return {
                ...state,
                rocket: {
                    ...state.rocket,
                    lisa: true,
                    star: state.rocket.star || star
                },
                gameField: { ...newGameField }
            }
        }
        if (action.data.name === 'rob') {
            const newGameField = removeCHAR('rob');
            const star = state.rob.star;
            return {
                ...state,
                rocket: {
                    ...state.rocket,
                    rob: true,
                    star: state.rocket.star || star
                },
                gameField: { ...newGameField }
            }
        }
    }
    if (action.type === 'TURN') {
        if (action.data.name === 'lisa') {
            return {
                ...state,
                lisa: {
                    ...state.lisa,
                    direction: action.data.direction
                }
            }
        }
        if (action.data.name === 'rob') {
            return {
                ...state,
                rob: {
                    ...state.rob,
                    direction: action.data.direction
                }
            }
        }
    }
    if (action.type === 'JUMP') {
        if (action.data.name === 'lisa') {
            return {
                ...state,
                lisa: {
                    ...state.lisa,
                    position: action.data.position
                }
            }
        }
    }
    if (action.type === 'HAMMER') {
        if (action.data) {
            const newGameField = { ...state.gameField };
            const newField = [ ...newGameField[action.data] ];
            newField.splice(newGameField[action.data].indexOf('asteroid'), 1);
            newGameField[action.data] = newField;
            return {
                ...state,
                gameField: { ...newGameField }
            }
        } else {
            return {
                ...state,
                wrongMove: 'There was no asteroid to hit with the hammer!'
            }
        }
    }
    if (action.type === 'IGNITE') {
        if (action.data) {
            return {
                ...state,
                win: true,
                rocket: {
                    ...state.rocket,
                    position: {
                        ...state.rocket.position,
                        top: '-100%'
                    }
                },
                lisa: {
                    ...state.lisa,
                    position: {
                        ...state.lisa.position,
                        top: '-100%',
                        transitionDuration: '8s'
                    }
                },
                rob: {
                    ...state.rob,
                    position: {
                        ...state.rob.position,
                        top: '-100%',
                        transitionDuration: '8s'
                    }
                },
            }
        } else {
            return {
                ...state,
                wrongMove: 'You can only ignite the rocket when both Lisa and Rob are on it!'
            }
        }
    }
    return state;
}

export default reducer;
