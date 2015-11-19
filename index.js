var request  = require('request');
var BASE_URL = 'https://api.pipelinedeals.com/api/v3/';

module.exports = {

  get: function (options, callback) {
    if (!options.endpoint || !options.apiKey) {
      return callback('options.endpoint and options.apiKey are both required');
    }

    options.endpoint = options.endpoint[0] === '/' ? options.endpoint.slice(1) : options.endpoint;
    var allEntries   = [];

    function makeCall(page) {

      var url = BASE_URL + options.endpoint + '?api_key=' + options.apiKey + '&page=' + page + '&per_page=200';

      request({url: url}, function (err, response, body) {
        if (err) {
          return callback(err);
        }
        try {
          body = JSON.parse(body);
        } catch (e) {
          return callback('Response was not valid json. The Url was probably invalid. URL: ' + url);
        }

        if(!body.entries) {
          return callback(null, [body]);
        }

        allEntries = allEntries.concat(body.entries);

        if (body.pagination.page < body.pagination.pages) {
          makeCall(++page);
        } else {
          callback(null, allEntries);
        }
      });
    }

    makeCall(1);
  }
};