export default {
    jwtSecret: process.env.process || 'local-test',
    mongoUrl: process.env.MONGO_DB_URL || 'mongodb://127.0.0.1:27017/MongoDB_Bookue_Test',
    port: process.env.PORT || 8000
}