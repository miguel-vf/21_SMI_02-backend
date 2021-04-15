module.exports = (sequelize, Sequelize) => {
    const Video = sequelize.define("videos", {  // Table name and fields
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false
        },
        file: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: '/videos/default.mp4'
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return Video;
};