

  var startTime = 10;

  var draggableOptions = {
        snap: ".target, .clone",
        snapTolerance: 15,
        refreshPositions: true,
        zIndex: 90,
        grid: [25, 25],
        helper: "clone",
        stop: handleDragStop
  };

  var draggableOptionsClones = {
        snap: ".target, .clone",
        refreshPositions: true,
        zIndex: 90,
        grid: [25, 25]
  };

  var resizableOptions = {
        handles: "e, w",
        grid: [25,0],
        containment: ".target"
  };

  $(function() {
              $( ".add" ).draggable(draggableOptions);
            });

  $(function() {
              $( ".add" ).resizable(resizableOptions);
           });

  $(function() {
              $( ".target" ).droppable();
            });

  $(function() {
               $( ".destroy" ).droppable({
                 drop: function( event, ui ) {
                  ui.draggable.remove();
                 },
                 accept: ".clone"
               });
             });

$(function() {
     chrome.storage.sync.get(['blockspots'], function(result) {
       if (result['blockspots']) {
         $('.target').html(result['blockspots']);
            chrome.storage.sync.remove(['blockspots']);
           }
   });
 });

  function handleDragStop( event, ui ) {
      var offsetXPos = parseInt( ui.offset.left );
      var offsetYPos = parseInt( ui.offset.top );
      var type = $(this).attr('class').split(' ')[1];
      $(".target").append("<div id='" + type + "' class='add " + type + " clone' style='position: absolute; top: " + offsetYPos + "px; left: " + offsetXPos + "px; z-index: 900;'>+" + type + "</div>");
      $( ".clone" ).draggable(draggableOptionsClones);
      $( ".clone" ).resizable(resizableOptions);
  }

  function getBlockTotals(){
    var poolTotal = 0;
    $('#pool').each(function() {
      poolTotal += ($(this).width())/100;
    $('.pool-hours > .total').html(poolTotal);
      return poolTotal;
  });
  var projectTotal = 0;
  $('#project').each(function() {
    projectTotal += ($(this).width())/100;
  $('.project-hours > .total').html(projectTotal);
    return projectTotal;
  });

  var skillTotal = 0;
  $('#skill').each(function() {
    skillTotal += ($(this).width())/100;
  $('.skill-hours > .total').html(skillTotal);
    return skillTotal;
  });

  var meetingTotal = 0;
  $('#meeting').each(function() {
    meetingTotal += ($(this).width())/100;
  $('.meeting-hours > .total').html(meetingTotal);
    return meetingTotal;
  });

  var goalieTotal = 0;
  $('#goalie').each(function() {
    goalieTotal += ($(this).width())/100;
  $('.goalie-hours > .total').html(goalieTotal);
    return goalieTotal;
  });
  $('.clone').each(function(){
    var type = $(this).attr('class').split(' ')[1];
    var startPos = $(this).position().left;
    var start = '"' + (startPos/100+startTime) + '"';
    var length = ($(this).width())/100;
    var end = '"' + ((startPos/100+startTime)+length) + '"';
    var minutes = start.split('.')[1];
        if (minutes != undefined){
          var minutes = (parseInt(minutes))/100*60 + '"';
          var startHour = start.split('.')[0];
          var start = startHour + ':' + minutes;
        }
    var minutes = end.split('.')[1];
            if (minutes != undefined){
              var minutes = (parseInt(minutes))/100*60 + '"';
              var endHour = end.split('.')[0];
              var end = endHour + ':' + minutes;
            }
    var start = start.replace(/["]+/g, "");
    var end = end.replace(/["]+/g, "");

    $('.schedule').append('<p class="times">' + type + ': ' + start + '-' + end + '</p>');
  });
  }

$(function() {
      setInterval(function (){
        var target = $('.target').html();
        chrome.storage.sync.set({
          'blockspots': target
        }, function() {
            console.log('Value is set to ' + target);
              });
      }, 1000);
  });

function resetStage(){
  $('.target').html('');
}


$(function() {
  $(".hour:first-child").html("<span class='time'>&nbsp;" + startTime + ":00</span><span class='half'>|</span>");
  $(".sync").click(getBlockTotals);
  $(".reset").click(resetStage);

           });





(function($) {
      $.fn.idlemouse = function(callback){
          var _this = $(this);
          var x_timer;
          _this.mouseup(function (){
              clearTimeout(x_timer);
              x_timer = setTimeout(clear_timer, 1000);
          });

          function clear_timer(){
              clearTimeout(x_timer);
              callback.call(_this);
          }
      }
      })(jQuery);
