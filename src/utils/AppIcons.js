import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
  'ios-person': [30, '#fff'],
  'ios-person--big': [50, '#fff'],
  'ios-search': [30, '#fff'],
  'ios-search--big': [50, '#fff'],
  'ios-people': [30, '#fff'],
  'ios-checkmark': [30, '#fff'],
  'ios-checkmark--big': [50, '#fff'],

  // SimpleLineIcons
  'user': [20, '#fff', SimpleLineIcons],
  'user--big': [30, '#fff', SimpleLineIcons],

  'magnifier': [20, '#fff', SimpleLineIcons],
  'magnifier--big': [50, '#fff', SimpleLineIcons],

  'pencil': [20, '#fff', SimpleLineIcons],
  'pencil--big': [50, '#fff', SimpleLineIcons],
};

const defaultIconProvider = Ionicons;
const iconsMap = {};
const iconsLoaded = new Promise((resolve) => {
  new Promise.all(
    Object.keys(icons).map(iconName => {
      // IconName--suffix--other-suffix is just the mapping name in iconsMap
      const Provider = icons[iconName][2] || defaultIconProvider; // Ionicons
      return Provider.getImageSource(
        iconName.replace(replaceSuffixPattern, ''),
        icons[iconName][0],
        icons[iconName][1]
      )
    })
  ).then((sources) => {
    Object.keys(icons)
      .forEach((iconName, idx) => (iconsMap[iconName] = sources[idx]));

    // Call resolve (and we are done)
    resolve(true);
  });
});

export {
  iconsMap,
  iconsLoaded
};
