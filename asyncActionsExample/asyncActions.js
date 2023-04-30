//? State
const initialState = {
	loading: false,
	users: [],
	error: '',
};

//? Action
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

//? Action creator
const fetchUsersRequest = () => {
	return {
		type: FETCH_USERS_REQUEST,
	};
};

const fetchUsersSuccess = (users) => {
	return {
		type: FETCH_USERS_SUCCESS,
		payload: users,
	};
};

const fetchUsersFailure = () => {
	return {
		type: FETCH_USERS_FAILURE,
	};
};

//? Reducer
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_USERS_SUCCESS:
			return {
				loading: false,
				users: action.payload,
				error: '',
			};
		case FETCH_USERS_FAILURE:
			return {
				loading: false,
				users: [],
				error: action.payload,
			};
	}
};

//? async action creator
const fetchUser = () => {
	// the special thing about this function is that it doesn't have to be pure, so it is allowed to have side effects such as async API calls and this function can also dispatch regular action which will be handled by the reducer.
	return function (dispatch) {
		// we dispatch fetchUsersRequest, this will basically set loading to true.
		dispatch(fetchUsersRequest());
		// axios API call/request
		axios
			.get('https://jsonplaceholder.typicode.com/users')
			.then((response) => {
				// response.data is the array of users, used map to get only id of each users
				const users = response.data.map((user) => user.id);
				dispatch(fetchUsersSuccess(users));
			})
			.catch((error) => {
				// error.message is the error description
				dispatch(fetchUsersFailure(error.message));
			});
	};
};

//? Store
const redux = require('redux');
const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
//thunk middleware brings the ability for an action creator to return a function instead of an action object.
const axios = require('axios');

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
	console.log(store.getState());
});
// now we dispatch asynchronous action creator
store.dispatch(fetchUser());
