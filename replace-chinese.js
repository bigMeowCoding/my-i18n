const fs = require("fs-extra");
const glob = require("glob");

const i18nDir = "src/i18n";
const locales = ["en", "zh"];

const extractChinese = (text) => {
  const chineseRegex = /(?<!\{\{)[\u4e00-\u9fa5]+(?!}})/g; // 匹配不在{{}}中的中文
  const matches = text.match(chineseRegex);
  return matches || [];
};
const replaceChineseWithT = (text, translations) => {
  return text.replace(/(<[^>]*>[\s\S]*[\u4e00-\u9fa5]+[\s\S]*<\/[^>]*>)/g, (fullMatch, innerMatch) => {
    const chineseMatch = innerMatch.match(/[\u4e00-\u9fa5]+/g);
    if (chineseMatch) {
      const replacedText = chineseMatch.map(match => {
        if (!translations[match]) {
          translations[match] = match;
        }
        return `$t('${match}')`;
      }).join('');
      return fullMatch.replace(/[\u4e00-\u9fa5]+/g, replacedText);
    }
    return fullMatch;
  }).replace(/[\u4e00-\u9fa5]+/g, (match) => {
    if (!translations[match]) {
      translations[match] = match;
    }
    return `$t('${match}')`;
  });
};

const updateI18nFiles = (translations) => {
  locales.forEach((locale) => {
    const filePath = `${i18nDir}/${locale}.json`;
    const fileContent = fs.existsSync(filePath)
      ? fs.readJsonSync(filePath)
      : {};
    const updatedContent = { ...fileContent, ...translations };
    fs.writeJsonSync(filePath, updatedContent, { spaces: 2 });
  });
};

const processFiles = (files) => {
  const translations = {};

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");
    const chineseTexts = extractChinese(content);
    if (chineseTexts.length > 0) {
      const updatedContent = replaceChineseWithT(content, translations);
      fs.writeFileSync(file, updatedContent, "utf8");
    }
  });

  updateI18nFiles(translations);
};

glob("src/**/*.{vue,js}", (err, files) => {
  if (err) throw err;
  processFiles(files);
});
