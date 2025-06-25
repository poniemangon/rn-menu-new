$(document).ready(function () {
    function toggleLogos() {
      if ($(window).scrollTop() === 0) {
        $('#logo-default').addClass('hidden');
        $('#logo-negative').removeClass('hidden');
        $('.header-section').removeClass('scrolled');
      } else {
        $('.header-section').addClass('scrolled');
        $('#logo-default').removeClass('hidden');
        $('#logo-negative').addClass('hidden');
      }
    }
    toggleLogos();
    $(window).on('scroll', toggleLogos);

let activeModalId = null;

$('.nav-item').on('click', function (e) {
    e.stopPropagation();
    
    const modalId = $(this).data('modal');

    $('.modal').removeClass('active');
    $('.nav-item').removeClass('active');

    if (modalId) {
        $('#' + modalId).addClass('active');
        $(this).addClass('active');
        activeModalId = modalId;
        
        // Reset categories to first one when opening any modal
        $('.categories li').removeClass('active');
        $('.links-col ul.links').removeClass('active');
        
        // Set first category and first links as active in the current modal
        $('#' + modalId + ' .categories li').first().addClass('active');
        $('#' + modalId + ' .links-col ul.links').first().addClass('active');
    }
});

$(document).on('click', function () {
    $('.modal').removeClass('active');
    $('.nav-item').removeClass('active');
    activeModalId = null;
});

$('.modal').on('click', function (e) {
    e.stopPropagation();
});

$('.fa-xmark').on('click', function () {
    $('.categories li').removeClass('active');
    $('.links-col ul.links').removeClass('active');

    $('.categories li').first().addClass('active');
    $('.links-col ul.links').first().addClass('active');

    const $modal = $(this).closest('.modal');
    $modal.removeClass('active');
    $('.nav-item').removeClass('active');
    activeModalId = null;
});
$('.categories li').on('click', function () {
    const category = $(this).data('category');

    $('.categories li').removeClass('active');
    $(this).addClass('active');

    $('.links-col ul.links').removeClass('active');
    $('.links-col ul.links[data-category="' + category + '"]').addClass('active');
});







});