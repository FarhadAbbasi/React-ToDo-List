

const Reducer = (state, action) => {
    switch (action.type) {

        case 'ADD-TODO':
            return {
                ...state,
                todos: [action.payload, ...state.todos]
            }

        case 'DELETE-TODO':
            return {
                ...state,
                todos: state.todos.filter((todo) => (todo.id !== action.payload))
            }

        default:
            return state;
    }
}

export default Reducer;