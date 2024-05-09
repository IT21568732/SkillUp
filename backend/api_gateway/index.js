// Initialize proxy middleware for each microservice
const proxyAuth = proxy("http://localhost:3001");
const proxyCourse = proxy("http://localhost:3002");
const proxyLearner = proxy("http://localhost:3003");
const proxyNotification = proxy("http://localhost:3004");
const proxyPayment = proxy("http://localhost:3005");