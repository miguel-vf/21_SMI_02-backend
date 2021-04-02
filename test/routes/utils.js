const Video = require('../../app/models').Video;

const bcrypt = require('bcrypt');
const config = require('../../app/config/auth.config');
const User = require('../../app/models').User;

const app = require('../../app/app');
const chai = require('chai');
const expect = require('chai').expect;

module.exports.populateVideos = async () => {
    await Video.create( { title: 'Lasagna', author: 'Pewdiepie' } );
    await Video.create( { title: 'El baptisterio romano', author: 'Señora random' } );
}

module.exports.dropVideos = async () => {
    await Video.destroy({  truncate: true, force: true, restartIdentity: true });
}

module.exports.populateUsers = async () => {
    await User.create( { username: 'Username1', password: bcrypt.hashSync('Password1', config.salt) } );
    await User.create( { username: 'Username2', password: bcrypt.hashSync('Password2', config.salt) } );
}

module.exports.dropUsers = async () => {
    await User.destroy({  truncate: true, force: true, restartIdentity: true });
}

module.exports.login = (username, password) => {
    return new Promise((resolve, reject) => {
        chai.request(app)
            .post('/login')
            .send({ username: username, password: password })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('token');
                resolve(res.body.token);
            });
        });
}