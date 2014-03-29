var Request = require("request"),
    Boom = require("boom");

var internals = {};

internals.replaceString = function(string, substring, start, end) {
    return string.substring(0, start) + substring + string.substring(end);
}

internals.handle = function(json, done) {
    
    var story = json.payload.value,
        title = story.title,
        paragraphs = story.content.bodyModel.paragraphs,
        markdown = "";
    
    paragraphs.forEach(function(paragraph) {
        var ptype = paragraph.type,
            text = paragraph.text,
            position = 0;
            
        paragraph.markups.forEach(function(markup) {
            
            var start = markup.start,
                end = markup.end,
                type = markup.type;
            
            var segment = text.substring(start, end);
            
            if (ptype !== 8) {
                if (type === 1) {
                    // bold
                    segment = "**" + segment + "**";
                }
                else if (type === 2) {
                    // italic
                    segment = "*" + segment + "*";
                }
                else if (type === 3) {
                    // url
                    segment = "[" + segment + "](" + markup.href + ")";
                }
            }
            
            
            text = internals.replaceString(text, segment, start, end);
        });
        
        if (ptype === 1) {
            // paragraph
            markdown += text + "\n\n";
        }
        else if (ptype === 2) {
            // h1
            markdown += "# " + text + " #\n\n";
        }
        else if (ptype === 3) {
            // h2
            markdown += "## " + text + " ##\n\n";
        }
        else if (ptype === 8) {
            // code block
            var split = text.split("\n");
            markdown += "    " + split.join("\n    ") + "\n\n";
        }
    });
    
    markdown = markdown.replace(/“/g, "\"")
                       .replace(/”/g, "\"")
                       .replace(/‘/g, "'")
                       .replace(/’/g, "'");
    
    done(markdown).type("text/plain");
};

exports.register = function(plugin, options, next) {
    
    var agent = options.agent;

    plugin.method("story", function(id, done) {
        
        var url = "https://medium.com/p/" + id + "?format=json";
        Request.get({
            url: url,
            headers: { "User-Agent": agent },
            timeout: 10000
        }, function(err, res, body) {
            
            var raw = body.substring(16),
                json;
            
            try {
                json = JSON.parse(raw);
            } catch (e) {
                return done(Boom.badRequest("Unable to parse remote response."));
            }
            
            if (json.success) {
                internals.handle(json, done);
            } else {
                done(Boom.notFound("Story not found."));
            }
        });
    }, {
        cache: {

        }
    });

    plugin.route({
        path: "/{collection}/{id}",
        method: "GET",
        config: {
            pre: ["story(params.id)"],
            handler: function(request, reply) {
                
                if (typeof request.pre.story === "string")
                    return reply(request.pre.story).type("text/plain");
                
                reply(request.pre.story);
            }
        }
    });

    next();
}
