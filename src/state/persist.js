export default function persistOnStateChange (state) {
  state.subscribe(() => {
    window.localStorage.setItem('state', JSON.stringify(state.get()))
  })
}
