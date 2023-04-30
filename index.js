//? Action
// define action, action is an object that has "type" property
const BUY_CAKE = 'BUY_CAKE';

// action creator which create action, i.e. it's a function that returns an action
function buyCake() {
	return {
		type: BUY_CAKE,
		info: 'First redux action',
	};
}

//? Reducer
// (previousState,action) => newState

const initialState = {
	numOfCakes: 10,
};

// Way-1 Not Good
// const reducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case 'BUY_CAKE':
// 			return {
// 				numOfCakes: state.numOfCakes - 1,
// 			};
// 		default:
// 			return state;
// 	}
// };

// Way-2 Good
// the state object might contain more than one property so, it is always safer to first create copy of state object and then change only properties that need to.
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'BUY_CAKE':
			return {
				// use spread operator to make copy of state object. we are basically asking reducer to first make copy of state object and then only update the number of Cakes and if there were other properties in state, they would remain unchanged.
				...state,
				numOfCakes: state.numOfCakes - 1,
			};
		default:
			return state;
	}
};

//? Store
const redux = require('redux');
const createStore = redux.legacy_createStore;

// store holds application state
const store = createStore(reducer);
// allows access to state via getState()
console.log('Initial State', store.getState());
// registers listeners via subscribe(listener)
store.subscribe(() => console.log('Updated state', store.getState()));
// allows state to be updated via dispatch(action)
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
// handles un-registering of listeners via the function returned by subscriber(listener)
// const unsubscribe = store.subscribe(() =>
// 	console.log('Updated state', store.getState())
// );
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// unsubscribe();
