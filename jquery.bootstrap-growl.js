(function () {
  var $;

  $ = jQuery;

  $.bootstrapGrowl = function (message, options) {
    var $alert, $alertHeading, css, offsetAmount;
    options = $.extend({}, $.bootstrapGrowl.default_options, options);

    //Create initial alert <div>
    $alert = $("<div/>").addClass("bootstrap-growl alert").attr("role", "alert");
    
    //Parse type from options and adjust alert color + header Icon/Text.
    //Supports some standard alert classes {alert-primary: primary, alert-success: success, alert-danger: danger, alert-info: info}
    //Will add more
    if (options.type == "primary" ||
        options.type == "success" ||
        options.type == "danger" ||
        options.type == "info") {
        $alert.addClass("alert-" + options.type);

        //Add an alert-header-# class and an SVG icon. Sits left of message.
        switch (options.type.toLowerCase()) {
            case 'success':
                $alertHeading = $("<div>").addClass("alert-header-2").append(
                    $("<svg width=\"1.25em\" height=\"1.25em\" viewBox=\"0 0 16 16\" class=\"ms-1 bi bi-shield-fill-check\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">").append(
                        $("<path>").attr("fill-rule", "evenodd").attr("d", "M8 .5c-.662 0-1.77.249-2.813.525a61.11 61.11 0 0 0-2.772.815 1.454 1.454 0 0 0-1.003 1.184c-.573 4.197.756 7.307 2.368 9.365a11.192 11.192 0 0 0 2.417 2.3c.371.256.715.451 1.007.586.27.124.558.225.796.225s.527-.101.796-.225c.292-.135.636-.33 1.007-.586a11.191 11.191 0 0 0 2.418-2.3c1.611-2.058 2.94-5.168 2.367-9.365a1.454 1.454 0 0 0-1.003-1.184 61.09 61.09 0 0 0-2.772-.815C9.77.749 8.663.5 8 .5zm2.854 6.354a.5.5 0 0 0-.708-.708L7.5 8.793 6.354 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z")
                    )).append(
                        $("<span class=\"text-start ps-2 fw-light\"><b class=\"fs-5 me-4\">Success!</b></span>")
                    );
                break;
            case 'danger':
                $alertHeading = $("<div>").addClass("alert-header-2").append(
                    $("<svg width=\"1.25em\" height=\"1.25em\" viewBox=\"0 0 16 16\" class=\"ms-1 bi bi-exclamation-circle-fill\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">").append(
                        $("<path>").attr("fill-rule", "evenodd").attr("d", "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z")
                    )).append(
                        $("<span class=\"text-start ps-2 fw-light\"><b class=\"fs-5 me-4\">Danger!</b></span>")
                    );
                break;
            case 'info':
                $alertHeading = $("<div>").addClass("alert-header-2").append(
                    $("<svg width=\"1.25em\" height=\"1.25em\" viewBox=\"0 0 16 16\" class=\"ms-1 bi bi-bell-fill\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">").append(
                        $("<path>").attr("fill-rule", "evenodd").attr("d", "M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z")
                    )).append(
                        $("<span class=\"text-start ps-2 fw-light\"><b class=\"fs-5 me-4\">Info!</b></span>")
                    );
                break;
            case 'primary':
                $alertHeading = $("<div>").addClass("alert-header-2").append(
                    $("<svg width=\"1.25em\" height=\"1.25em\" viewBox=\"0 0 16 16\" class=\"ms-1 bi bi-bell-fill\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">").append(
                        $("<path>").attr("fill-rule", "evenodd").attr("d", "M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z")
                    )).append(
                        $("<span class=\"text-start ps-2 fw-light\"><b class=\"fs-5 me-4\">Alert!</b></span>")
                    );
                break;
        }
    } else {
        //Default alert for no type. Use primary Bootstrap 5 color.
        $alert.addClass("alert-primary");
    }

    //Embed alert-header-# <div> inside $alert <div>
    $alert.append($alertHeading);

    //Append message to <span>, appended to $alert <div>
    $alert.append($("<span>").append(message));
    
    //Add X button, and 2 styling classes
    if (options.allow_dismiss) {
        $alert.addClass("alert-dismissible show shadow");
        $alert.append("<button class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\" type=\"button\"></button>");
    } else {
        $alert.addClass("show shadow");
    }

    //legacy option support
    if (options.top_offset) {
        options.offset = {
            from: "top",
            amount: options.top_offset
        };
    }

    //Calc alert offset, and find last Name/Id val + 1 (Dynamic <div>'s)
    offsetAmount = options.offset.amount;
    lastGrowlId = 0
    $(".bootstrap-growl").each(function () {
        lastGrowlId = isNaN(parseInt($(this).attr("id"), 10) + 1) ? lastGrowlId : parseInt($(this).attr("id"), 10) + 1;
        return offsetAmount = Math.max(offsetAmount, parseInt($(this).css(options.offset.from)) + $(this).outerHeight() + options.stackup_spacing);
    });

    //Styling
    css = {
        "position": (options.ele === "body" ? "fixed" : "absolute"),
        "margin": 0,
        "opacity": 1,
        "z-index": "9999",
        "display": "none"
    };
    css[options.offset.from] = offsetAmount + "px";
    $alert.css(css);
    if (options.width !== "auto") {
        $alert.css("width", options.width + "px");
    }

    //Adjust alert <div> name + id to make it Dynamic
    $alert.attr("name", lastGrowlId);
    $alert.attr("id", lastGrowlId);

    //Append alert <div> to body, or custom element supplied
    $(options.ele).append($alert);
    
    switch (options.align) {
        case "center":
            $alert.css({
                "left": "50%",
                "margin-left": "-" + ($alert.outerWidth() / 2) + "px"
            });
            break;
        case "left":
            $alert.css("left", "20px");
            break;
        default:
            $alert.css("right", "20px");
    }

    $alert.fadeIn(300);
    if (options.delay > 0) {
        $alert.delay(options.delay).fadeOut(function () {
            return $(this).alert("close");
        });
    }

    //Little trick to force the browser to re-render the SVG icons.
    //Without it, the <path> will not get drawn.
    $alert.html($alert.html());
    return $alert;
  };

  $.bootstrapGrowl.default_options = {
      ele: "body",
      type: "info",
      offset: {
          from: "top",
          amount: 20
      },
      align: "right",
      width: "auto",
      delay: 4000,
      allow_dismiss: true,
      stackup_spacing: 10
  };

}).call(this);
