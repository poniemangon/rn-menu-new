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
            $('.links-col').removeClass('active');

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
            $('.links-col').removeClass('active');

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
    $('.links-col').removeClass('active');

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
    $('.links-col').removeClass('active');
    $('.subcategories li').removeClass('active');
});

// Habilitar click en subcategorías con hijos en desktop y mobile
$('.subcategories').on('click', 'li.has-children', function (e) {
    // Si el click fue en un <a> dentro de subcat-links, no togglear
    if ($(e.target).closest('a').length > 0) return;
    var $this = $(this);
    var subcatId = $this.data('subcategory');
    if ($this.hasClass('active')) {
        $this.removeClass('active');
        // Opcional: también ocultar links-col si quieres
        // $('.links-col').removeClass('active');
        return;
    }
    $this.siblings().removeClass('active');
    $this.addClass('active');
    // Check if links-col es visible
    if ($('.links-col').hasClass('active')) {
        $('.links-col ul.links').removeClass('active');
        $('.links-col ul.links[data-subcategory="' + subcatId + '"]').addClass('active');
    } else {
        $('.links-col').addClass('active');
        $('.links-col ul.links').removeClass('active');
        $('.links-col ul.links[data-subcategory="' + subcatId + '"]').addClass('active');
    }
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


$(document).on('click', '.mobile-nav-item', function() {
    
    // Cerrar todos los demás
    $navItem.nextAll('.mobile-nav-item').removeClass('opened');
    // Toggle este
    $(this).toggleClass('opened');
    
});


$(document).on('click', '.mobile-subcat.has-children p', function(e) {
    e.stopPropagation();
    var $subcat = $(this).closest('.mobile-subcat.has-children');
    // Cerrar solo los que están después del actual
    $subcat.nextAll('.has-children').removeClass('opened');
    $subcat.toggleClass('opened');
});


$(document).on('click', '.mobile-category-header', function() {
    var $category = $(this).closest('.mobile-category');
    $category.nextAll('.mobile-category').removeClass('opened');
    $category.toggleClass('opened');
});



});