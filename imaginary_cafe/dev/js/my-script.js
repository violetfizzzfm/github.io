/* ================================================== *
 *
 *    google map
 *
 * ================================================== */

google.load("maps", "3.x", {"other_params":"sensor=false"});

//マップの初期設定
function initialize() {

//マップの中心座標
  var myLatLng = new google.maps.LatLng(35.706992,139.526996);

//マップの設定オプション
  var myOptions = {
    zoom: 14,                                 //ズームレベル
    center: myLatLng,                         //中心座標
    mapTypeId: google.maps.MapTypeId.ROADMAP,  //マップタイプ
    mapTypeControlOptions: {
       mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'simple']
    }
  };

  map = new google.maps.Map(document.getElementById("map"), myOptions);

  var samplestyle = [
  {
    "stylers": [
      { "saturation": -100 }
    ]
  }
  ];

  var samplestyleOptions = {
    name: "simple"
  };

  var sampleMapType = new google.maps.StyledMapType(samplestyle, samplestyleOptions);
  map.mapTypes.set('simple', sampleMapType);
  map.setMapTypeId('simple');

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map
  });
}

//作成したマップの呼び出し
google.setOnLoadCallback(initialize);


;(function($){

  'use strict';

  /* ================================================== *
   *
   *    Bootstrap Navbar
   *
   * ================================================== */

  // Auto-Hiding
  $('.navbar-fixed-top').autoHidingNavbar();
  $(window).scroll(function () {
    var header = $('#header');
    var scroll = $(document).scrollTop();
    if(scroll >= 100){
      header.addClass('is-black');
    } else {
      header.removeClass('is-black');
    }
  });

  // is Shown ?
  var $navbar_collapse = $('.navbar-collapse');
  $navbar_collapse.on('show.bs.collapse', function () {
    $(this).parents('.navbar').addClass('is-show');
  });
  $navbar_collapse.on('hidden.bs.collapse', function () {
    $(this).parents('.navbar').removeClass('is-show');
  });


  /* ================================================== *
   *
   *    Daterangepicker
   *
   * ================================================== */

   var $daterange = $('#daterange');
   $daterange.daterangepicker(
   {
    ranges: {
     'Today': [moment(), moment()],
     'Yesterday': [moment().subtract(1,'days'), moment().subtract(1,'days')],
     'Last 7 Days': [moment().subtract(6,'days'), moment()],
     'Last 30 Days': [moment().subtract(29,'days'), moment()],
     'This Month': [moment().startOf('month'), moment().endOf('month')],
     'Last Month': [moment().subtract(1,'month').startOf('month'), moment().subtract(1,'month').endOf('month')]
   },
   startDate: moment().subtract(29,'days'),
   endDate: moment()
  },
  function(start, end) {
    $(this).find('span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  }
  );



   /* ================================================== *
   *
   *    ClockPicker
   *
   * ================================================== */
  $('.clockpicker').clockpicker();



  /* ================================================== *
   *
   *    Slick
   *
   * ================================================== */
  $('.responsive').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });



  /* ================================================== *
   *
   *    WOW
   *
   * ================================================== */

  new WOW().init();



  /* ================================================== *
   *
   *    Vague
   *
   * ================================================== */

  var vague = $('.demo-blurOverlay').Vague({
    intensity:      3,      // Blur Intensity
    forceSVGUrl:    false,   // Force absolute path to the SVG filter,
    // default animation options
    animationOptions: {
      duration: 1000,
      easing: 'linear' // here you can use also custom jQuery easing functions
    }
  });



  /* ================================================== *
   *
   *    Drower
   *
   * ================================================== */

  var $drawer = $('.drawer');
    $drawer.drawer();
    $drawer.on('drawer.opened', function(){
      vague.blur();
    });
    $drawer.on('drawer.closed', function(){
      vague.unblur();
  });



  /* ================================================== *
   *
   *    Drower
   *
   * ================================================== */

$("[name='my-checkbox']").bootstrapSwitch();

})(jQuery);
