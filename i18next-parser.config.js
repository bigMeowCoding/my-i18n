module.exports = {
  locales: ['en', 'zh'],
  output: 'src/locales/$LOCALE.json',
  input: [
    'src/**/*.{js,jsx,ts,tsx,vue}',
    '!src/locales/**',
  ],
  keySeparator: false,
  namespaceSeparator: false,
  useKeysAsDefaultValue: true,
  verbose: true,
  attr: false, // If you are not using attributes for localization
  functions: ['t', '$t'], // The functions you use for translations
  trans: true, // Enable JSX <Trans> components support
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'], // The file extensions to parse
  defaultValue: (locale, ns, key) => locale === 'en' ? key : '', // Provide a default value
};
