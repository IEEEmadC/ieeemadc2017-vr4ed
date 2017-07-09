import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


export const colors = {
  red: 'rgb(213,63,67)',
  yellow: 'rgb(209,190,43)',
  purple: 'rgb(77,74,151)',
  pink: 'rgb(157,81,133)',
  blue: 'rgb(57,172,201)',
  green: 'rgb(19,159,106)',
  gray: 'rgb(192,192,186)',
  white: 'white',
  buttonBackColor: 'rgba(52,52,52,0.4)',
};

export const globalStyles = StyleSheet.create({
  textField: {
    height: 33,
    paddingLeft: 10,
    fontFamily: 'Avenir-Book',
    fontSize: 25,
    color: 'white',
    marginVertical: 16,
  },
  // game card, category card styles
  cardTouchable: {
    width: height / 2.7791666667,
    height: height / 2.7791666667,
    margin: 8
  },
  cardImage: {
    position: 'absolute',
    width: height / 2.7791666667,
    height: height / 2.7791666667,
    borderRadius: 40,
    borderColor: colors.gray,
    borderWidth: 5,
    aspectRatio: 1,
  },
  wtContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wtText: {
    flex: 1,
    fontSize: height / 30,
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'flex-start',
    marginVertical: 8,
    fontWeight: '300',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

/*
colors :
 213 63 67
 209 190 43
 77 74 151
 157 81 133
 57 172 201
 19 159 106
 192 192 186

*/
