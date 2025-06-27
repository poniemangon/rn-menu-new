$(document).ready(function () {
    function toggleLogos() {
      if ($(window).scrollTop() === 0 && !($('.burger').hasClass('opened'))) {
        $('.header-section').removeClass('scrolled');
      } else {
        $('.header-section').addClass('scrolled');
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

$('.burger').on('click', function(){
    $('.burger').toggleClass('opened');
    $('.nav-col').toggleClass('opened');
    $('.header-section').toggleClass('scrolled');
    $('.header-section').toggleClass('opened');
    
    // Toggle body scrolling prevention
    if ($('.header-section').hasClass('opened')) {
        $('body').addClass('header-opened');
    } else {
        $('body').removeClass('header-opened');
    }
});

// Mobile Navigation Functionality
$('.mobile-nav-item-header').on('click', function() {
    const $navItem = $(this).closest('.mobile-nav-item');
    const $otherNavItems = $('.mobile-nav-item').not($navItem);
    
    // Close other nav items
    $otherNavItems.removeClass('opened');
    
    // Toggle current nav item
    $navItem.toggleClass('opened');
});

$('.mobile-category-header').on('click', function(e) {
    e.stopPropagation(); // Prevent nav item from closing
    const $category = $(this).closest('.mobile-category');
    const $otherCategories = $(this).closest('.mobile-nav-categories').find('.mobile-category').not($category);
    
    // Close other categories in the same nav item
    $otherCategories.removeClass('opened');
    
    // Toggle current category
    $category.toggleClass('opened');
});







});