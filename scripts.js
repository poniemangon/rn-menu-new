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
let hoverTimeout = null;
let isModalOpen = false;

$('.nav-item').on('mouseenter', function (e) {
    e.stopPropagation();
    
    const modalId = $(this).data('modal');

    // Clear any existing timeout
    if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
    }

    // If switching between modals (modal is already open), don't animate
    if (isModalOpen && activeModalId !== modalId) {
        $('.modal').addClass('switching');
        $('.modal').removeClass('active');
        $('.nav-item').removeClass('active');
        
        if (modalId) {
            $('#' + modalId).addClass('active');
            $(this).addClass('active');
            activeModalId = modalId;
            
            $('.categories li').removeClass('active');
            $('.subcategories').removeClass('active');
            $('.subcategories li').removeClass('active');
            $('.links-col ul.links').removeClass('active');
            $('.links-col').hide();

            $('#' + modalId + ' .categories li').first().addClass('active');
            $('#' + modalId + ' .subcategories').first().addClass('active');
            
            // Remove switching class after a brief delay
            setTimeout(function() {
                $('.modal').removeClass('switching');
            }, 50);
        }
    } else {
        // First time opening a modal - allow animation
        $('.modal').removeClass('active');
        $('.nav-item').removeClass('active');

        if (modalId) {
            $('#' + modalId).addClass('active');
            $(this).addClass('active');
            activeModalId = modalId;
            isModalOpen = true;
            
            $('.categories li').removeClass('active');
            $('.subcategories').removeClass('active');
            $('.subcategories li').removeClass('active');
            $('.links-col ul.links').removeClass('active');
            $('.links-col').hide();

            $('#' + modalId + ' .categories li').first().addClass('active');
            $('#' + modalId + ' .subcategories').first().addClass('active');
        }
    }
});

$('.nav-item').on('mouseleave', function (e) {
    // Set a timeout to close the modal after a short delay
    // This prevents the modal from closing immediately when moving from nav-item to modal
    hoverTimeout = setTimeout(function() {
        $('.modal').removeClass('active');
        $('.nav-item').removeClass('active');
        activeModalId = null;
        isModalOpen = false;
    }, 100);
});

$('.modal').on('mouseenter', function (e) {
    // Clear the timeout when hovering over the modal
    if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
    }
});

$('.modal').on('mouseleave', function (e) {
    // Close the modal when leaving it
    $('.modal').removeClass('active');
    $('.nav-item').removeClass('active');
    activeModalId = null;
    isModalOpen = false;
});

// --- PUENTE INVISIBLE ENTRE NAV Y MODAL ---
$('.bridge-hover-zone').on('mouseenter', function (e) {
    if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
    }
});
$('.bridge-hover-zone').on('mouseleave', function (e) {
    // Inicia el timeout de cierre igual que en nav-item
    hoverTimeout = setTimeout(function() {
        $('.modal').removeClass('active');
        $('.nav-item').removeClass('active');
        activeModalId = null;
        isModalOpen = false;
    }, 100);
});

// Remove the document click handler since we're using hover now
// The modals will be controlled by hover events instead

$('.modal').on('click', function (e) {
    e.stopPropagation();
});

$('.fa-xmark').on('click', function () {
    $('.categories li').removeClass('active');
    $('.subcategories').removeClass('active');
    $('.subcategories li').removeClass('active');
    $('.links-col ul.links').removeClass('active');
    $('.links-col').hide();

    $('.categories li').first().addClass('active');

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
    $('.links-col').hide();
    $('.subcategories li').removeClass('active');
});


// Disabled JavaScript for subcategories on desktop - now using CSS hover only
// Mobile functionality remains unchanged
if (window.innerWidth >= 992) {
    // Desktop: Disable subcategory click handlers, use CSS hover only
} else {
    // Mobile: Keep existing functionality
    $('.subcategories').on('click', 'li.has-children', function () {
        var subcatId = $(this).data('subcategory');
        
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        
        // Check if links-col is visible
        if ($('.links-col').is(':visible')) {
            // If visible, just change the links content
            $('.links-col ul.links').removeClass('active');
            $('.links-col ul.links[data-subcategory="' + subcatId + '"]').addClass('active');
        } else {
            // If hidden, show it directly
            $('.links-col').show();
            $('.links-col ul.links').removeClass('active');
            $('.links-col ul.links[data-subcategory="' + subcatId + '"]').addClass('active');
        }
    });
}

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
    // Oculta todos los demás
    $navItem.nextAll('.mobile-nav-item').find('.mobile-nav-categories').hide();
    $navItem.nextAll('.mobile-nav-item').removeClass('opened');
    // Muestra este
    $categories.toggle();
    if ($categories.is(':visible')) {
        $navItem.addClass('opened');
    } else {
        $navItem.removeClass('opened');
    }
});


$(document).on('click', '.mobile-subcat.has-children p', function(e) {
    e.stopPropagation();
    var $subcat = $(this).closest('.mobile-subcat.has-children');
    var $links = $subcat.find('.mobile-subcat-links').first();
    // Cerrar solo los que están después del actual
    $subcat.nextAll('.has-children').find('.mobile-subcat-links').hide();
    $subcat.nextAll('.has-children').removeClass('opened');
    $links.toggle();
    if ($links.is(':visible')) {
        $subcat.addClass('opened');
    } else {
        $subcat.removeClass('opened');
    }
});


$(document).on('click', '.mobile-category-header', function() {
    var $category = $(this).closest('.mobile-category');
    var $links = $category.find('.mobile-category-links').first();
    $category.nextAll('.mobile-category').find('.mobile-category-links').hide();
    $category.nextAll('.mobile-category').removeClass('opened');
    $links.toggle();
    if ($links.is(':visible')) {
        $category.addClass('opened');
    } else {
        $category.removeClass('opened');
    }
});



});