export default {
    one(state,getter) {
        console.log('->state',state,'->getter',getter);
        return state.list[0]
    }
}