import { AsyncStorage } from 'react-native';


const OPENED_CATEGORIES = '@openedCategories';


export async function getOpenedCategory() {
  try {
    const value = await AsyncStorage.getItem(OPENED_CATEGORIES);
    if (value !== null) {
      // We have data!!
      const cats = JSON.parse(value);
      return cats;
    }
  } catch (error) {
    // Error retrieving data
  }
}
/**
 *
 *
 * @export
 * @param {Component} screen
 * @param {string} target
 * @param {Object} params
 */
export function resetTo(screen, target, params) {
  screen.props.navigation.dispatch({
    type: 'Navigation/RESET',
    index: 0,
    actions: [{ type: 'Navigation/NAVIGATE', routeName: target, params }],
  });
}

let preTarget = null;

export function navigateTo(screen, target, params) {
  if (preTarget !== target) {
    preTarget = target;
    screen.props.navigation.navigate(target, params);
    setTimeout(() => {
      preTarget = null;
    }, 500);
  }
}

/*eslint-disable */
const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
/*eslitn-enable */
export function validateEmail(email) {
  if (!email) {
    return false;
  }

  if (email.length > 254) {
    return false;
  }

  const valid = tester.test(email);
  if (!valid) {
    return false;
  }

  // Further checking of some things regex can't handle
  const parts = email.split('@');
  if (parts[0].length > 64) {
    return false;
  }

  const domainParts = parts[1].split('.');
  if (domainParts.some(part => part.length > 63)) {
    return false;
  }

  return true;
}

export function validatePassword(pass) {
  if (!pass) {
    return false;
  }
  if (typeof pass !== 'string') {
    return false;
  }
  if (pass.length < 6) {
    return false;
  }
  return true;
}


export function getValidation(email, password) {
  return validateEmail(email) && validatePassword(password);
}
