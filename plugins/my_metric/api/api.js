const plugin = {};
const common = require('../../../api/utils/common.js');
const {validateUserForWrite,validateUserForRead} = require('../../../api/utils/rights.js');
const pluginManager = require('../../pluginManager.js');

(function(plugin) {
    pluginManager.register("/i/my_metric", function(requestParameters) {
        const params = requestParameters.params;
        validateUserForWrite(params, function(params) {
                    const data = params.qstring;
                    common.db.collection('my_metric').insert(data, function(err, app) {
                        if (err)
                            common.returnMessage(params, 500, err);
                            //ideally this should be 500, as the server encountered an error, and http-status is one of the way to communicate state of the server to frontend, but docs say 200.
                        else
                            common.returnMessage(params, 200, "Success");
                    });
        });
        return true;
    });
    pluginManager.register("/o/my_metric", function(requestParameters) {
        const params = requestParameters.params;
        validateUserForRead(params, function(params) {
                    const data = params.qstring;
                    common.db.collection('my_metric').find({}, function(err, metrics) {
                        if (err)
                            common.returnMessage(params, 500, err);
                            //ideally this should be 500, as the server encountered an error, and http-status is one of the way to communicate state of the server to frontend, but docs say 200.
                        else
                            common.returnMessage(params, 200, metrics);
                    });
        });
        return true;
    });
}(plugin));

module.exports = plugin;