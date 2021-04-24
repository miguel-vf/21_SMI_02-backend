const app = require('../../app/app');
const chai = require('chai');
const expect = require('chai').expect;
const utils = require('./utils');
const fs = require('fs');

chai.use(require('chai-http'));
chai.use(require('chai-arrays'));

const sinon = require('sinon');
const mediaEncoding = require('../../app/media/encoding');

const VIDEO_URI = '/videos';


describe('Get videos: ', () => {

    /**
     * Populate database with some data before all the tests in this suite.
     */
    before(async () => {        
        await utils.populateVideos();
    });

    /**
     * This is run once after all the tests.
     */
    after(async () => {
        await utils.dropVideos();
    });

    /**
     * Get all videos correctly
     */
    it('should get all videos', (done) => {
        chai.request(app)
            .get(VIDEO_URI)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.array();
                expect(res.body.length).to.equal(2);
                done();
            });
    });
<<<<<<< HEAD
    /**
     * Get an existing video correctly
     */
    it('should get all videos', (done) => {
        chai.request(app)
            .get(VIDEO_URI)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.array();
                expect(res.body.length).to.equal(2);
                done();
            });
    });

=======

    /**
     * Get an existing video correctly
     */
    it('should get a video', (done) => {
        chai.request(app)
            .get(VIDEO_URI + '/2')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.id).to.be.equal(2);
                expect(res.body.title).to.be.equal('El baptisterio romano');
                expect(res.body.author).to.be.equal('Encarnita');
                done();
            });
    });
>>>>>>> old-project-state
});

describe('Create videos: ', () => {

    // Auth token
    let token;

    /**
     * Populate database with some data before all the tests in this suite.
     */
    before(async () => {        
        await utils.populateVideos();
        await utils.populateUsers();
        token = await utils.login('Username1', 'Password1');
    });

    /**
     * This is run once after all the tests.
     */
    after(async () => {
        await utils.dropVideos();
        await utils.dropUsers();
    });

    /**
     * A video should be created correctly
     */
    it('should create a valid video', (done) => {
        const title = "Another video";
        const author = "Another author";
        chai.request(app)
            .post(VIDEO_URI)
            .set('Authorization', 'Bearer ' + token)
            .send({ title: title, author: author})
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body.title).to.be.equal(title);
                expect(res.body.author).to.be.equal(author);
                expect(res.body.id).to.equal(3);
                done();
            });
    });

    /**
     * An invalid title should raise and error
     */
     it('should receive an error with an invalid title', (done) => {
        chai.request(app)
            .post(VIDEO_URI)
            .set('Authorization', 'Bearer ' + token)
            .send({ title: "", author: "unknown author"})
            .end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
    });

    /**
     * A missing title should raise and error
     */
     it('should receive an error with a missing title', (done) => {
        chai.request(app)
            .post(VIDEO_URI)
            .set('Authorization', 'Bearer ' + token)
            .send({ author: "unknown author"})
            .end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
    });

    /**
     * An invalid author should raise and error
     */
     it('should receive an error with an invalid author', (done) => {
        chai.request(app)
            .post(VIDEO_URI)
            .set('Authorization', 'Bearer ' + token)
            .send({ title: "Some title", author: "a"})
            .end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
    });

    
    /**
     * A missing author should raise and error
     */
     it('should receive an error with a missing author', (done) => {
        chai.request(app)
            .post(VIDEO_URI)
            .set('Authorization', 'Bearer ' + token)
            .send({ title: "unknown title"})
            .end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
    });
<<<<<<< HEAD
});

describe('Upload video covers: ', () => {
=======

    /**
     * A video can have a description
     */
     it('should create a video with description', (done) => {
        const title = "Another video2";
        const author = "Another author";
        const description = "This is a video";
        chai.request(app)
            .post(VIDEO_URI)
            .set('Authorization', 'Bearer ' + token)
            .send({ title: title, author: author, description: description })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body.title).to.be.equal(title);
                expect(res.body.author).to.be.equal(author);
                expect(res.body.description).to.be.equal(description);
                expect(res.body.id).to.equal(4);
                done();
            });
    });
});

describe('Upload videos: ', () => {
>>>>>>> old-project-state

    /**
     * Populate database with some data before all the tests in this suite.
     */
    before(async () => {
        await utils.populateVideos();
        await utils.populateUsers();
        token = await utils.login('Username1', 'Password1');
<<<<<<< HEAD
=======
        // Mock normalize function
        sinon.stub(mediaEncoding, 'normalize').resolves('/videos/video-2.mp4'); // Do nothing
        sinon.stub(mediaEncoding, 'createThumbnail').resolves('/images/video-2.jpg'); // Do nothing
>>>>>>> old-project-state
    });

    /**
     * This is run once after all the tests.
     */
    after(async () => {
        await utils.dropVideos();
        await utils.dropUsers();
<<<<<<< HEAD
    });

    /**
     * A Video cover should be uploaded correctly
     */
    it('should upload a Video cover', (done) => {
        chai.request(app)
            .post(VIDEO_URI + '/2/upload')
            .set('Authorization', 'Bearer ' + token)
            //.attach('coverFile', fs.readFileSync('./test/assets/cover.png'), 'cover.png')
            .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.id).to.be.equal(2);
            expect(res.body.title).to.be.equal('title');
            expect(res.body.author).to.be.equal('author');
            expect(res.body.id).to.equal(3);
            done();
            });
    }).timeout(5000);  // Timeout 5 secs


    /**
     * TODO: tests for invalid upoloads
     */
=======
        // Restore normalize function
        mediaEncoding.normalize.restore();
        mediaEncoding.createThumbnail.restore();
        // Sinon functions can be erased if ffmpeg and video.mp4 are in the directory
    });

    /**
     * A video should be uploaded correctly
     */
    it('should upload a video', (done) => {
        chai.request(app)
            .post(VIDEO_URI + '/2/upload')
            .set('Authorization', 'Bearer ' + token)
            .attach('videoFile', fs.readFileSync('./test/assets/video.mp4'), 'video.mp4')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.id).to.be.equal(2);
                expect(res.body.title).to.be.equal('El baptisterio romano');
                expect(res.body.author).to.be.equal('Encarnita');
                expect(res.body.file).to.be.equal('/videos/video-2.mp4');
                expect(res.body.thumbnail).to.be.equal('/images/video-2.jpg');
                done();
            });
    }).timeout(8000);  // Timeout 8 secs


    /**
     * Test for invalid uploads
     */

     it('should receive an error with not a video', (done) => {
        chai.request(app)
            .post(VIDEO_URI + '/2/upload')
            .set('Authorization', 'Bearer ' + token)
            .attach('videoFile', fs.readFileSync('./test/assets/cover.png'), 'cover.png')
            .end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
    }).timeout(5000);  // Timeout 5 secs

});

describe('Upload thumbnails: ', () => {

    /**
     * Populate database with some data before all the tests in this suite.
     */
    before(async () => {
        await utils.populateVideos();
        await utils.populateUsers();
        token = await utils.login('Username1', 'Password1');
        // Mock normalize function
        sinon.stub(mediaEncoding, 'normalize').resolves('/images/video-2.png'); // Do nothing
    });

    /**
     * This is run once after all the tests.
     */
    after(async () => {
        await utils.dropVideos();
        await utils.dropUsers();
        // Restore normalize function
        mediaEncoding.normalize.restore();
    });

    /**
     * A video thumbnail should be uploaded correctly
     */
    it('should upload a thumbnail', (done) => {
        chai.request(app)
            .post(VIDEO_URI + '/2/upload/thumbnail')
            .set('Authorization', 'Bearer ' + token)//
            .attach('thumbFile', fs.readFileSync('./test/assets/cover.png'), 'cover.png')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.id).to.be.equal(2);
                expect(res.body.title).to.be.equal('El baptisterio romano');
                expect(res.body.author).to.be.equal('Encarnita');
                expect(res.body.thumbnail).to.be.equal('/images/video-2.png');
                done();
            });
    }).timeout(8000);  // Timeout 8 secs


    /**
     * Test for invalid thumbnail uploads
     */

     it('should receive an error with not a thumbnail', (done) => {
        chai.request(app)
            .post(VIDEO_URI + '/2/upload/thumbnail')
            .set('Authorization', 'Bearer ' + token)//
            .attach('thumbFile', fs.readFileSync('./test/assets/video.mp4'), 'video.mp4')
            .end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
    }).timeout(5000);  // Timeout 5 secs

>>>>>>> old-project-state
});