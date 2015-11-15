import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  isLoading: false,
  loadedFiles: [],
  sampleFiles: [
    {
      name: "Snakes in South Africa",
      filename: 'data/coordinates_snakes_south_america.txt'
    },
  ],
  data: "", // string data for point occurrence data
  parseData: false
};

export default function files(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOAD_FILES:
      return {...state, loadedFiles: Array.from(action.filesList).map(file => file.name)};
    case ActionTypes.LOAD_SAMPLE_FILE:
      return {...state, loadedFiles: [action.filename]};
    case ActionTypes.PARSE_TEXT_DATA:
      return {
        ...state,
        parseData: true,
        data: action.payload.data,
        loadedFiles: [action.payload.filename],
      };
    case ActionTypes.ADD_FEATURES:
      return {
        ...state,
        data: "",
        parseData: false
      };
    case ActionTypes.CANCEL_FILE_ACTIONS:
      return initialState;
    default:
      return state;
  }
}