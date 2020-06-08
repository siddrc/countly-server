const plugin = {},
    countlyConfig = require('../../../frontend/express/config');

(function(plugin) {
    plugin.init = function(app, countlyDb, express) {

        //add your middleware or process requests here
        app.get(countlyConfig.path + '/my_metric', function(req, res, next) {

            //get url parameters
            const parts = req.url.split("/");
            const id = parts[parts.length - 1];

            //read data from db using countlyDB
            countlyDb.collection('my_metric').findOne({
                '_id': id
            }, function(err, plugindata) {

                //if no data available
                if (err || !att) res.send('404: Page not Found', 404);
                else {

                    //render template with data	
                    res.render('../../../plugins/my_metric/frontend/public/templates/default', {
                        path: countlyConfig.path || "",
                        cdn: countlyConfig.cdn || "",
                        data: plugindata
                    });
                }
            });
        });
    };
}(plugin));

module.exports = plugin;