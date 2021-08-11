import { getInitialData } from "../utils/api";
import { receiveTweets } from "./tweets";
import { receiveUsers } from "./users";
import { setAuthedUser } from "./authUser";
const AUTHED_ID = "tylermcginnis";
//this is the main action it takes all the semi-actions and the it makes a fake HTTP-request to access data form the fake DB(_DATA)
// and pass the results to the actions
export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, tweets }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveTweets(tweets));
      dispatch(setAuthedUser(AUTHED_ID));
    });
  };
}
