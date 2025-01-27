module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  generatorOpts: {
    compact: false,
    // Increase size limit to 2MB to accommodate large Vue components
    maxLineLength: 2097152 // 2MB in bytes
  }
};
