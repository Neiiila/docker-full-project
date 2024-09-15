
// This file is used to store the configuration of the application.
module.exports = {
    MONGO_IP: process.env.MONGO_IP || "database",
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    REDIS_URL: process.env.REDIS_URL || "sessionDb", // instead of URL using IP address we can call the servie name which is the hostname
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    SECRET_REDIS: process.env.SECRET_REDIS ,
}