const app = require('../../app/app');
const chai = require('chai');
const expect = require('chai').expect;
const utils = require('./utils');

chai.use(require('chai-http'));
chai.use(require('chai-arrays'));

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
                expect(res.body.author).to.be.equal('Señora random');
                done();
            });
    });
});

describe('Create videos: ', () => {

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
     * A video should be created correctly
     */
    it('should create a valid video', (done) => {
        const title = "Another video";
        const author = "Another author";
        chai.request(app)
            .post(VIDEO_URI)
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
            .send({ title: "unknown title"})
            .end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
    });
});