const type = process.env.BUILD_TYPE;

let config = {};


if (type === 'lib') {
    config = {
      entry:'./src/index.tsx',
      cjs: { type: 'babel', lazy: true },
      esm: false,
    };
  }
  
  if (type === 'es') {
    config = {
      entry:'./src/index.tsx',
      cjs: false,
      esm: {
        type: 'babel',
      },
    };
  }
  
  export default config;
  