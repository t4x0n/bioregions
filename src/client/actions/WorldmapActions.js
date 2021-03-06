import {
  LOAD_WORLD,
  ADD_WORLD,
  CHANGE_PROJECTION,
  CHANGE_GRATICULE_STEP,
  CHANGE_SHOW_GRATICULES,
  CHANGE_CLIP_TO_LAND,
  CHANGE_SHOW_CELL_BORDERS
} from '../constants/ActionTypes';
import {setError} from './ErrorActions';
import * as DataFetching from '../constants/DataFetching';
import axios from 'axios'

/**
* Add the loaded world
* @param world A topojson object
*/
function addWorld(world) {
  return {
    type: ADD_WORLD,
    world
  }
}

function requestWorld(url) {
  return {
    type: LOAD_WORLD,
    url
  }
}

function fetchWorld(url) {
  return dispatch => {
    dispatch(requestWorld(url));
    return axios.get(url)
      .then(response => dispatch(addWorld(response.data)))
      .catch(response => dispatch(setError(`Error loading world '${url}': ${response}`)));
  }
}

export function loadWorld() {
  return (dispatch, getState) => {
    if (getState().worldmap.worldStatus !== DataFetching.DATA_NOT_FETCHED) {
      console.log("Warning: Load world called more than once, ignoring...");
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
    let worldUrl = "maps/physical/land.topojson";
    return dispatch(fetchWorld(worldUrl));
  }
}

export function changeGraticuleStep(graticuleStep) {
  return {
    type: CHANGE_GRATICULE_STEP,
    graticuleStep
  }
}

export function changeShowGraticules(showGraticules) {
  return {
    type: CHANGE_SHOW_GRATICULES,
    showGraticules
  }
}

export function changeClipToLand(clipToLand) {
  return {
    type: CHANGE_CLIP_TO_LAND,
    clipToLand
  }
}

export function changeShowCellBorders(showCellBorders) {
  return {
    type: CHANGE_SHOW_CELL_BORDERS,
    showCellBorders
  }
}
