//? Action
// define action, action is an object that has "type" property
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

// action creator which create action, i.e. it's a function that returns an action
function buyCake() {
	return {
		type: BUY_CAKE,
		info: 'First redux action',
	};
}

function buyIcecream() {
	return {
		type: BUY_ICECREAM,
	};
}

//? Reducer
// (previousState,action) => newState

const initialState = {
	numOfCakes: 10,
	numOfIceCream: 15,
};

//! Way-1 Not Good
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

//? Way-2 Good
// the state object might contain more than one property so, it is always safer to first create copy of state object and then change only properties that need to.
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'BUY_CAKE':
			return {
				// use spread operator to make copy of state object. we are basically asking reducer to first make copy of state object and then only update the number of Cakes and if there were other properties in state, they would remain unchanged.
				...state,
				numOfCakes: state.numOfCakes - 1,
			};
		case 'BUY_ICECREAM':
			return {
				...state,
				numOfIceCream: state.numOfIceCream - 1,
			};
		default:
			return state;
	}
};

//? Store
const redux = require('redux');
const createStore = redux.legacy_createStore;

//? store holds application state
const store = createStore(reducer);
//? allows access to state via getState()
console.log('Initial State', store.getState());
//? registers listeners via subscribe(listener)
// store.subscribe(() => console.log('Updated state', store.getState()));
// allows state to be updated via dispatch(action)
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(buyCake());
//? handles un-registering of listeners via the function returned by subscriber(listener)
const unsubscribe = store.subscribe(() =>
	console.log('Updated state', store.getState())
);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
unsubscribe();

//? Redux pattern :- you create a store, declare the initial state and reducer, define your action and actions creators, subscribe to the store, dispatch action to update the store and finally un-subscribe to the changes.
