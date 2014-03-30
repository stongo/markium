exports.register = function(plugin, options, next) {
    
    plugin.views({
        engines: {
            jade: "jade"
        },
        compileOptions: {
            pretty: true
        },
        path: "./views"
    });
    
    plugin.route({
        path: "/",
        method: "GET",
        handler: function(request, reply) {
            reply.view("index", options);
        }
    });
    
    next();
}