import * as ActionTypes from '../constants/ActionTypes';
import _ from 'lodash';
import io from '../utils/io';

const initialState = {
  isShowingFileUI: false, // UI to load and see loaded files
  isLoading: false,
  files: [], // array of File objects to load
  urls: [], // urls to files to fetch
  basename: "Infomap bioregions",
  loadedSpecies: [],
  treeFilename: "", // filename of loaded tree
  haveFile: false,
  sampleFiles: [
    {
      name: "Global mammals",
      type: "point occurrences",
      size: "56Mb",
      filenames: ['mammals_global.tsv']
    },
    {
      name: "Neotropical mammals",
      type: "point occurrences",
      size: "2.8Mb",
      filenames: ['mammals_neotropics.csv']
    },
  ],
  sampleTreeFiles: [
    {
      name: "Global mammals",
      type: "phylogeny",
      size: "191Kb",
      filename: 'mammals_global.nwk',
    },
    {
      name: "Neotropical mammals",
      type: "phylogeny",
      size: "54Kb",
      filename: 'mammals_neotropics.nwk',
    },
  ],
  error: false,
  message: "",
  subMessage: "",
  headLines: [],
  parsedHead: [], // To select name,lat,long fields in dsv file
  parsedFeatureProperty: null, // To select name field in shapefiles/GeoJSON
};

export default function files(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_FILE_UI:
      return {
        ...state,
        isShowingFileUI: action.isShowingFileUI
      }
    case ActionTypes.FETCH_FILES:
      return {
        ...initialState,
        isShowingFileUI: true,
        urls: action.urls,
        isLoading: true
      }
    case ActionTypes.LOAD_FILES:
      let shpFile = action.files.filter(file => /shp$/.test(file.name));
      const filename = shpFile.length > 0 ? shpFile[0].name : action.files[0].name;
      const basename = io.basename(filename);
      return {
        ...initialState, // Restore to initial state
        isShowingFileUI: true,
        files: action.files,
        basename,
        isLoading: true,
        haveFile: true
      };
    case ActionTypes.LOAD_TREE:
      return {
        ...state,
        treeFilename: action.file.name,
        isLoading: true,
      }
    case ActionTypes.FILE_ERROR:
      if (!state.isLoading) //  If canceled, ignore further loading events
        return;
      return {
        ...state,
        error: true,
        message: action.message,
        subMessage: action.subMessage
      };
    case ActionTypes.REQUEST_DSV_COLUMN_MAPPING:
      if (!state.isLoading) //  If canceled, ignore further loading events
        return state;
      return {
        ...state,
        parsedHead: action.parsedHead
      };
    case ActionTypes.REQUEST_GEOJSON_NAME_FIELD:
      if (!state.isLoading) //  If canceled, ignore further loading events
        return state;
      return {
        ...state,
        parsedFeatureProperty: action.parsedFeatureProperty
      };
    case ActionTypes.CANCEL_FILE_ACTIONS:
      return initialState;
    case ActionTypes.ADD_SPECIES_AND_BINS:
      if (!state.isLoading) //  If canceled, ignore further loading events
        return state;
      return {
        ...state,
        isShowingFileUI: false,
        isLoading: false,
        headLines: [],
        parsedHead: [],
        parsedFeatureProperty: null,
      };
    case ActionTypes.ADD_PHYLO_TREE:
      if (!state.isLoading) //  If canceled, ignore further loading events
        return state;
      return {
        ...state,
        isShowingFileUI: false,
        isLoading: false,
      };
    case ActionTypes.REMOVE_SPECIES:
      return {
        ...initialState,
        isShowingFileUI: state.isShowingFileUI,
      };
    default:
      return state;
  }
}
