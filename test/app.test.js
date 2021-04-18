const expect = require('chai').expect;
const request = require('request');
const { port } = require('../configs/appConfig');

it('Root Endpoint', function (done) {
  request(`http://localhost:${port}`, function (error, response, body) {
    expect(response.statusCode).to.equal(200);
    expect(body).to.contain.oneOf(['Logged In', 'Logged Out']);
    done();
  });
});
