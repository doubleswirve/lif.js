export default ({initialState}) => ({
  increment ({count}) {
    return {
      count: count + 1
    }
  },

  decrement ({count}) {
    return {
      count: count - 1
    }
  },

  changeType (_, type) {
    return {
      type
    }
  },

  reset() {
    return initialState;
  }
});
