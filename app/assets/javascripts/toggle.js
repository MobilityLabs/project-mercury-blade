$(document).ready(function() {
    $('.comments-container').toggle();
});

$('#comment-message-box').on('click', function(evt) {
    $('.comments-container').toggle();
    if($('.comments-container').is(':hidden')) {
        evt.target.text = 'Show Comments';
    } else {
        evt.target.text = 'Hide Comments'
    }
});