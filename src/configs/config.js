const configEnv = {
	FETCH_STRING: process.env.REACT_APP_FETCH_STRING,
	TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY,
	TOKEN_HEADER: process.env.REACT_APP_TOKEN_HEADER,
	ID_KEY: process.env.REACT_APP_ID_KEY,
	TIME_OUT: process.env.REACT_APP_TIME_OUT
};

const DFRoleValue = ["User", "Admin", "Trainer", "Auditer"]
const DFGenderValue = ["Male","Female", "Unknown"]
const SuccessStatusCodes = [200, 201, 302]

export {
	configEnv,
	DFRoleValue,
	DFGenderValue,
	SuccessStatusCodes,
};