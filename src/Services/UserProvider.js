import {createContext, useState} from 'react';

/*
  There is no real 'user' - just faked to handle view_id.  This has ended up being a single
  place to store some stuff that needs to be shared across other components (i.e. AdditionalParam).
*/

const UserContext = createContext({
  currentUserView: '',
  selectedItem: {},
  sortSelected: '',
  userID: '',
  setUserInfo: (userData) => {},
});

const UserProvider = ({ children }) => {
  const setUserInfo = ({ currentUserView, selectedItem, sortSelected, userID }) => {
    updateUserData((prevState) => {
      const newState = { ...prevState };

      if (currentUserView !== undefined) newState.currentUserView = currentUserView;
      if (selectedItem !== undefined) newState.selectedItem = selectedItem;
      if (sortSelected !== undefined) newState.sortSelected = sortSelected;
      if (userID !== undefined) newState.userID = userID;

      return newState;
    });
  };

  const userState = {
    currentUserView: '',
    selectedItem: '',
    sortSelected: '',
    userID: '',
    setUserInfo,
  };

  const [userData, updateUserData] = useState(userState);

  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
