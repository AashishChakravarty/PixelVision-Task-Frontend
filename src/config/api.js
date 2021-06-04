const currentEnvironment = {
  development: {
    url: 'http://localhost:3001',
  },
  staging: {
    url: 'http://localhost:3001',
  },
  production: {
    url: 'http://localhost:3001'
  },
}


export default process.env.REACT_APP_API_URL === 'development'
  ? currentEnvironment.development
  : process.env.REACT_APP_API_URL === 'staging'
    ? currentEnvironment.staging
    : process.env.REACT_APP_API_URL === 'production'
      ? currentEnvironment.production
      : currentEnvironment.development;