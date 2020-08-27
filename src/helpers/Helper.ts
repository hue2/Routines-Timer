export function handleInput(state: any, event: any) {
  const re = /^[0-9\b]+$/;
  
  if (event.target.value === '' || re.test(event.target.value)) {
    for (var i = 0; i < event.target.classList.length; i++) {
      state[event.target.classList[i]] = +(event.target.value);
    } 
  }
  
  return state;
}

 
