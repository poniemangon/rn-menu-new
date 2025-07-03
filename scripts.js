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
        
        $('.categories li').removeClass('active');
        $('.links-col ul.links').removeClass('active');

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

    $('.subcategories').removeClass('active');
    $('.subcategories[data-category="' + category + '"]').addClass('active');

   
    var $firstSubcat = $('.subcategories[data-category="' + category + '"] li').first();
    $('.subcategories li').removeClass('active');
    $firstSubcat.addClass('active');
    var firstSubcatId = $firstSubcat.data('subcategory');

   
    $('.links-col ul.links').removeClass('active');
    $('.links-col ul.links[data-subcategory="' + firstSubcatId + '"]').addClass('active');
});


$('.subcategories').on('click', 'li.has-children', function () {
    var subcatId = $(this).data('subcategory');

    $(this).siblings().removeClass('active');
    $(this).addClass('active');
   
    $('.links-col ul.links').removeClass('active');
    $('.links-col ul.links[data-subcategory="' + subcatId + '"]').addClass('active');
});

$('.burger').on('click', function(){
    $('.burger').toggleClass('opened');
    $('.nav-col').toggleClass('opened');
    $('.header-section').toggleClass('scrolled');
    $('.header-section').toggleClass('opened');
    
   
    if ($('.header-section').hasClass('opened')) {
        $('body').addClass('header-opened');
    } else {
        $('body').removeClass('header-opened');
    }
});

$('.mobile-nav-item-header').on('click', function() {
    const $navItem = $(this).closest('.mobile-nav-item');
    const $otherNavItems = $('.mobile-nav-item').not($navItem);
    

    $otherNavItems.removeClass('opened');
    

    $navItem.toggleClass('opened');
});

$('.mobile-category-header').on('click', function(e) {
    e.stopPropagation(); 
    const $category = $(this).closest('.mobile-category');
    const $otherCategories = $(this).closest('.mobile-nav-categories').find('.mobile-category').not($category);
    

    $otherCategories.removeClass('opened');
    

    $category.toggleClass('opened');
});


$(document).on('click', '.mobile-nav-item-header', function() {
    var $navItem = $(this).closest('.mobile-nav-item');
    var $categories = $navItem.find('.mobile-nav-categories').first();
    console.log('Click en categoría principal, estado actual:', $categories.is(':visible'));

    $navItem.nextAll('.mobile-nav-item').find('.mobile-nav-categories').slideUp(200);
    $navItem.nextAll('.mobile-nav-item').removeClass('opened');

    $categories.slideToggle(200, function() {
        if ($categories.is(':visible')) {
            $navItem.addClass('opened');
        } else {
            $navItem.removeClass('opened');
        }
    });
});


$(document).on('click', '.mobile-subcat.has-children p', function(e) {
    e.stopPropagation();
    var $subcat = $(this).closest('.mobile-subcat.has-children');
    var $links = $subcat.find('.mobile-subcat-links').first();
    console.log('Click en subcategoría, estado actual:', $links.is(':visible'));
    // Cerrar solo los que están después del actual
    $subcat.nextAll('.has-children').find('.mobile-subcat-links').slideUp(200);
    $subcat.nextAll('.has-children').removeClass('opened');

    $links.slideToggle(200, function() {
        if ($links.is(':visible')) {
            $subcat.addClass('opened');
        } else {
            $subcat.removeClass('opened');
        }
    });
});


$(document).on('click', '.mobile-category-header', function() {
    var $category = $(this).closest('.mobile-category');
    var $links = $category.find('.mobile-category-links').first();

    $category.nextAll('.mobile-category').find('.mobile-category-links').slideUp(200);
    $category.nextAll('.mobile-category').removeClass('opened');

    $links.slideToggle(200, function() {
        if ($links.is(':visible')) {
            $category.addClass('opened');
        } else {
            $category.removeClass('opened');
        }
    });
});



});