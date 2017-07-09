
import I18n, { getLanguages } from 'react-native-i18n';

const en = require('./langs/en.json');
const tr = require('./langs/tr.json');

I18n.fallbacks = true;

I18n.translations = {
  en,
  tr,
};

getLanguages().then((languages) => {
  I18n.locale = languages[0];
});

export default I18n;

