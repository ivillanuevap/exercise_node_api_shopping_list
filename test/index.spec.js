const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const sinon = require('sinon');
const keyStore = require('../api-key-ks');
const {Request, Response} = require('./mock');
const utils = require('./utils');
const {uniq} = require('lodash');
const Promise = require('bluebird');

chai.use(chaiHttp);

describe('shopping-list-api', () => {
    let req, res, next, agent;

    beforeEach((done) => {
        req = new Request();
        res = new Response();
        next = sinon.stub();
        utils.generateKeysFile()
            .then(() => {
                done();
            })
    });

    afterEach((done) => {
        if (agent) {
            agent.close();
        }
        utils.clearKeysFile()
            .then(() => {
                done();
            })
    });

    it('Generate an API key and append to text file', (done) => {
        keyStore(req, res);
        setTimeout(() => {
            utils.getKeysFromFile()
                .then(data => {
                    data.length.should.eql(1);
                    done();
                })
        }, 500);
    });

    it('Generate 5 unique API Keys', done => {
        let n = 5;
        for (let i = 0; i < n; i++) {
            keyStore(req, res);
        }
        setTimeout(() => {
            utils.getKeysFromFile()
                .then(data => {
                    data.length.should.eql(n);
                    const uniqKeys = uniq(data);
                    uniqKeys.length.should.eql(data.length);
                    done();
                })
        }, 500);
    });


    it('Return API Key in response', done => {
        let response;
        chai.request(server)
            .get('/authenticate')
            .then(res => {
                response = res;
                return utils.getKeysFromFile();
            })
            .then(keys => {
                keys[0].should.equal(response.body.api_key);
                done();
            })
    });

    it('Return 401 if api_hey header is not present', done => {
        chai.request(server)
            .get('/items')
            .then(response => {
                response.status.should.equal(401);
                next.callCount.should.eql(0);
                done();
            })
    });

    it('Return 401 if api_hey header is invalid', done => {
        chai.request(server)
            .get('/items')
            .set('api_key', 'INVALID_KEY')
            .then(response => {
                response.status.should.equal(401);
                done();
            })
    });


    it('Validate api_key header for protected routes', done => {
        agent = chai.request.agent(server);

        agent
            .get('/authenticate')
            .then(({body: {api_key}}) => {
                return Promise.all([
                    agent
                        .get('/items')
                        .set('api_key', api_key),
                    agent
                        .post('/items')
                        .set('api_key', api_key)
                ])
            })
            .then(responseList => {
                responseList.forEach(response => {
                    response.status.should.match(/^20[0|1]/);
                });
                done();
            })
    });

    it('Not require api_key header for unprotected routes', done => {
        agent = chai.request.agent(server);
        Promise
            .mapSeries([
                agent
                    .get('/items/3'),
                agent
                    .get('/'),
                agent
                    .post('/items')
            ], res => res)
            .then(responseList => {
                responseList.forEach((response, i) => {
                    if (i !== 2) {
                        response.status.should.match(/^20[0|1]/);
                    } else {
                        response.status.should.eql(401);
                    }
                });
                done();
            })

    });
});
