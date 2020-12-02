export default function test(state = { data: {} }, action) {
    switch (action.type) {
      case "addCheckContact":
        return {
          data: action.payload,
        }
      default:
        return state
    }
  }
  