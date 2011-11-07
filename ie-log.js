/**
* ie-log
*
* @author Paul Thurlow
*/
(function($, _) {

  ieLog = function() {

    var $debug = $('.yj-dbg-console');
    if ($debug.length) {
      $debug = $(
        '<div class="yj-dbg-console yj-dbg-console-closed">'+
          '<div class="yj-dbg-toolbar">'+
            '<a href="javascript://" class="x-grey-icon"></a>'+
            '<a href="javascript://" class="yj-expand">+</a>'+
            '<a href="javascript://" class="stream-icon"></a>'+
            '<span class="yj-title">Console</span>'+
          '</div>'+
          '<div class="yj-dbg-container"><ul class="yj-dbg-list"></ul></div>'+
        '</div>');
      $debug.find('a.yj-expand').click(function(e) {
        var $elem = $(this)
          , text = $elem.text().indexOf('+') != -1 ? '-' : '+';
        $debug.toggleClass('yj-dbg-console-open');
        $debug.toggleClass('yj-dbg-console-closed');
        $elem.text(text);
      });
      $debug.find('a.x-grey-icon').click(function(e) { $debug.hide(); });
      $debug.find('a.stream-icon').bind('mousedown', function(e) {
          $('body').bind('mousemove.yjconsole', function(e) {
            var height = yam.$(window).height() - e.pageY;
            $debug.height(height);
            $debug.find('.yj-dbg-container').height(height - 30);
          });
          $('body').bind('mouseup.yjconsole', function(e) {
            $('body').unbind('mousemove.yjconsole');
            $('body').unbind('mouseup.yjconsole');
          });
        });
      $('body').append($debug);
    }

    args = Array.prototype.slice.call(arguments);

    message = _.reduce(args, function(prev, next) {
      if(typeof next == 'string' || typeof next == 'number' || typeof next == 'boolean') {
        return prev + ' ' + next;
      }
      return prev + ' ' + (typeof next);
    }, '');

    var li = $('<li class="yj-dbg-item"></li>').append('p').html(message)
      , children = $debug.find('li')
      , $title = $debug.find('.yj-title')
      , text = $title.text();
    if (children.length > 100) {
      children.slice(0, children.length - 100).remove();
    }
    $debug.find('ul').append(li);
    if (text.indexOf('(') == -1) {
      $title.text('Console (1)');
    } else {
      text = text.match(/\(.*?\)/)[0].replace('(','').replace(')','');
      $title.text('Console (' + (parseInt(text, 10) + 1) + ')');
    }
  }

})($, _);