export function handleInput(state: any, event: any) {
  const re = /^[0-9\b]+$/;
  
  if (event.target.value === '' || re.test(event.target.value)) {
    for (var i = 0; i < event.target.classList.length; i++) {
      state[event.target.classList[i]] = +(event.target.value);
    } 
  }
  
  return state;
}

 
export function getCurrentClockStatus(state: any) {
  return {
    isBreak: state.value < 1 && !state.isBreak, 
    hasTime: state.value > 0,
    hasBreaks: state.timeBreak.secondBreak > 0 || state.timeBreak.minuteBreak > 0,
    hasRepeats: state.repeats.tempRepeat > 0 && state.value < 1,  
  }  
};

export function adjustVolume(volume) {
  //@ts-ignore
  document.getElementById("player").volume = volume;
  return true;
}
