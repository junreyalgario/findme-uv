/**
 * @author Script47 (https://github.com/Script47/Toast)
 * @description Toast - A Bootstrap 4.2+ jQuery plugin for the toast component
 * @version 0.7.1
 **/
 /**
 * @author Script47 (https://github.com/Script47/Toast)
 * @description Toast - A Bootstrap 4.2+ jQuery plugin for the toast component
 * @version 0.7.1
 **/
(function ($) {
    var TOAST_CONTAINER_HTML = '<div class="toast-container" aria-live="polite" aria-atomic="true"></div>';
    var TOAST_WRAPPER_HTML = '<div class="toast-wrapper"></div>';

    $.toast = function (opts) {
        // If container is not set in opts use body
        var general_container = $('body');
        if (opts.container && opts.container.length === 1)
            general_container = opts.container;

        // if toast container and wrapper are not present in container create them
        if (!general_container.children('.toast-container').length) {
            general_container.prepend(TOAST_CONTAINER_HTML);
            general_container.children('.toast-container').append(TOAST_WRAPPER_HTML);

            general_container.on('hidden.bs.toast', '.toast', function () {
                $(this).remove();
            });
        }
        var toast_wrapper = general_container.children('.toast-container').children('.toast-wrapper');

        var id = 'toast-' + ($('.toast').length + 1),
            html = '',
            bg_header_class = '',
            fg_header_class = '',
            fg_subtitle_class = 'text-muted',
            fg_dismiss_class = '',
            title = opts.title || 'Notice!',
            subtitle = opts.subtitle || '',
            content = opts.content || '',
            type = opts.type || 'info',
            delay = opts.delay || -1,
            img = opts.img,
            pause_on_hover = opts.pause_on_hover || false,
            pause = false,
            delay_or_autohide = '';

        switch (type) {
            case 'info':
                bg_header_class = 'bg-info';
                fg_header_class = 'text-white';
                fg_subtitle_class = 'text-white';
                fg_dismiss_class = 'text-white';
                break;

            case 'success':
                bg_header_class = 'bg-success';
                fg_header_class = 'text-white';
                fg_subtitle_class = 'text-white';
                fg_dismiss_class = 'text-white';
                break;

            case 'warning':
            case 'warn':
                bg_header_class = 'bg-warning';
                fg_header_class = 'text-white';
                fg_subtitle_class = 'text-white';
                fg_dismiss_class = 'text-white';
                break;

            case 'error':
            case 'danger':
                bg_header_class = 'bg-danger';
                fg_header_class = 'text-white';
                fg_subtitle_class = 'text-white';
                fg_dismiss_class = 'text-white';
                break;
        }

        if (pause_on_hover !== false) {
            var hide_timestamp = Math.floor(Date.now() / 1000) + (delay / 1000);

            delay_or_autohide = 'data-autohide="false"';
            pause_on_hover = 'data-hide-timestamp="' + hide_timestamp + '"';
        } else {
            if (delay === -1) {
                delay_or_autohide = 'data-autohide="false"';
            } else {
                delay_or_autohide = 'data-delay="' + delay + '"';
            }
        }

        html += '<div id="' + id + '" class="toast" role="alert" aria-live="assertive" aria-atomic="true" ' + delay_or_autohide + ' ' + pause_on_hover + '>';
        
        
        //toast-content-wrapper
        html += '<div class="toast-content-wrapper '+ bg_header_class +'">'; //Toast wrapper

        html += '<div class="icon"><i class="fa fa-exclamation-circle fa-3x"></i></div>'

        html += '<div class="toast-body-container">';// Toast body and header container
        html += '<div class="toast-header">';
        if (typeof img !== 'undefined') {
            html += '<img height="30px" width="30px" src="' + img.src + '" class="' + (img.class || '') + ' mr-2" alt="' + (img.alt || 'Image') + '" ' + (typeof img.title !== 'undefined' ? 'data-toggle="tooltip" title="' + img.title + '"' : '') + '>';
        }

        html += '<strong class="mr-auto">' + title + '</strong>';
        html += '<small class="' + fg_subtitle_class + '">' + subtitle + '</small>';
        html += '<button type="button" class="ml-1 mb-1 close" data-dismiss="toast" aria-label="Close">';
        html += '<span aria-hidden="true">&times;</span>';
        html += '</button>';
        html += '</div>';// end header

        if (content !== '') {
            html += '<div class="toast-body">'
            html += content
            html += '</div>';// end body
        }

        html += '</div>'; // End body and header container

        html += '</div>';// End toast wrapper
        html += '</div>';// End toast

        toast_wrapper.append(html);
        toast_wrapper.find('.toast:last').toast('show');

        if (pause_on_hover !== false) {
            setTimeout(function () {
                if (!pause) {
                    $('#' + id).toast('hide');
                }
            }, delay);

            $(document).on('mouseover', '#' + id, function () {
                pause = true;
            });

            $(document).on('mouseleave', '#' + id, function () {
                var current = Math.floor(Date.now() / 1000),
                    future = parseInt($(this).data('hide-timestamp'));

                pause = false;

                if (current >= future) {
                    $(this).toast('hide');
                }
            });
        }
    }
}(jQuery));

$('body').tooltip({
    selector: '[data-toggle="tooltip"]'
});

const TYPES = ['info', 'warning', 'success', 'error'],
  TITLES = {
      'info': 'Notice!',
      'success': 'Awesome!',
      'warning': 'Watch Out!',
      'error': 'Doh!'
  },
  CONTENT = {
      'info': 'Hello, world! This is a toast message.',
      'success': 'The action has been completed.',
      'warning': 'It\'s all about to go wrong',
      'error': 'It all went wrong.'
  };

function show_image_toast() {
  let type = TYPES[Math.floor(Math.random() * TYPES.length)],
      title = TITLES[type],
      content = CONTENT[type];

  $.toast({
      title: title,
      subtitle: '',
      content: 'Allow user',
      type: type,
      delay: 5000,
      img: {
          src: 'assets/img/icon/info-blue.png',
          class: 'rounded',
          title: 'Thumbnail Title',
          alt: 'Alternative'
      }
  });
}

function show_random_snack() {
  let type = TYPES[Math.floor(Math.random() * TYPES.length)],
      content = CONTENT[type].replace('toast', 'snack');

  $.toast({
      title: content,
      type: type,
      delay: 5000
  });
}

function show_toast_in_container() {
  let type = TYPES[Math.floor(Math.random() * TYPES.length)],
      title = TITLES[type],
      content = CONTENT[type];

  $.toast({
  		// Toast title
      title: 'Incorrect password',
      subtitle: '',
      content: 'Please enter correct password.', // Toa
      type: 'danger',
      delay: 5000,
      container: ''
  });
}

function toast(toastTitle, toastContent, toastType) {
  let type = TYPES[Math.floor(Math.random() * TYPES.length)],
      title = TITLES[type],
      content = CONTENT[type];

  $.toast({
      // Toast title
      title: toastTitle,
      // Time alerted
      subtitle: '',
      // Toast content
      content: toastContent,
      // Toast type eg. success, info etc.
      type: toastType,
      delay: 10000,
      container: ''
  });
}