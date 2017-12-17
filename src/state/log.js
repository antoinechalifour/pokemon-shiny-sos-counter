export default function logStateChanges (state) {
  state.subscribe(() => console.log('State changed:', state.get()))
}
