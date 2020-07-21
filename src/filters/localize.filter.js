import store from '../store';
import uk from '../locales/uk.json';
import en from '../locales/en.json';
const locales = {
  'uk-UA': uk,
  'en-US': en,
};
export default function localizeFilter(params = 'test') {
  const locale = store.getters.info.locale || 'uk-UA';
  return locales[locale][params] || `[Localaze error]: key ${params} not found`;
}
