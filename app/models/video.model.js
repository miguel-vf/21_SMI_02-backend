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
        }/*,
        cover: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: '/covers/default.png'
        }*/
    });

    return Video;
};