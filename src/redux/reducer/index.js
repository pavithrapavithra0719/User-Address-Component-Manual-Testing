import { combineReducers } from 'redux';
import job from './job';
import company from './company';
import user from './user';
import category from './category';

const appReducer = combineReducers({
  job,
  company,
  user,
  category
});

export default appReducer;
