module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.', '../lib'],
          alias: {
            '@components': './src/components',
            '@models': './src/models',
            '@lib': './lib',
            '@utils': './src/utils',
            '@containers': './src/containers',
          },
        },
      ],
    ],
  };
};
