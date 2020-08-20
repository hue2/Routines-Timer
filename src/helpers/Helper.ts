export function handleInput(state: any, event: any) {
    let currentState = {...state};
    for (var i = 0; i < event.target.classList.length; i++) {
      currentState[event.target.classList[i]] = +(event.target.value);
    } 

    return currentState;
}

 
