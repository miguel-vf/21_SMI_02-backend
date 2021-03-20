const Video = require('../../app/models/video.model');
/*
const bcrypt = require('bcrypt');
const config = require('../../app/config/auth.config');
const User = require('../../app/models').User;
const app = require('../../app/app');
const chai = require('chai');
const expect = require('chai').expect;
*/
module.exports.populateVideos = async () => {
    await Video.create( { title: 'Lasagna', author: 'Pewdiepie' } );
    await Video.create( { title: 'El baptisterio romano', author: 'Señora random' } );
}

module.exports.dropVideos = async () => {
    await Video.drop();
    //await Video.destroy({  truncate: true, force: true, restartIdentity: true });
}
