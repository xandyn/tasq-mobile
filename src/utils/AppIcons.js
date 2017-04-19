import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
  'ios-person': [30, '#000000'],
  'ios-person--big': [50, '#bbb'],
  'ios-search': [30, '#000000'],
  'ios-search--big': [50, '#bbb'],
  'ios-people': [30, '#000000'],
  'ios-checkmark': [30, '#000000'],
  'ios-checkmark--big': [50, '#000000'],

  // SimpleLineIcons
  'user': [20, '#000000', SimpleLineIcons],
  'user--big': [30, '#bbb', SimpleLineIcons],

  'magnifier': [20, '#000000', SimpleLineIcons],
  'magnifier--big': [50, '#bbb', SimpleLineIcons],

  'pencil': [20, '#000000', SimpleLineIcons],
  'pencil--big': [50, '#bbb', SimpleLineIcons],
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
