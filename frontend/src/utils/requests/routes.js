// Define API endpoints

const ROUTES = {
  getStatus: '/api/status/',
  getLogs: '/api/log/',
  controllers: {
    pressure: '/api/controllers/pressure/',
    depth: '/api/controllers/depth/',
    ec: '/api/controllers/ec/',
    ph: '/api/controllers/ph/',
    mix: '/api/controllers/mix/',
    mist: '/api/controllers/mist/',
  },
  config: '/api/config/',
  history: '/api/history/'
}

export default ROUTES
