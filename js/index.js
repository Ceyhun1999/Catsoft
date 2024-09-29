AOS.init();

/*header animation script start*/
window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY || window.pageYOffset;
  const header = document.querySelector("header");

  // Set the threshold for the sticky behavior
  const stickyThreshold = 30;

  // Toggle the sticky class based on the scroll position
  if (scrollTop >= stickyThreshold) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});
/*header animation script end*/

$(document).ready(function () {
  const progressFill = document.querySelector(".progress-fill");
  var swiper = new Swiper(".parallax-slider", {
    speed: 1000,
    parallax: true,
    loop: true,
    autoplay: {
      delay: 10000, // Adjust autoplay delay as needed
      disableOnInteraction: false,
    },
    grabCursor: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -1000],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChange: function () {
        // Reset progress bar when slide changes
        progressFill.style.width = "0%";
      },
      autoplayTimeLeft(s, time, progress) {
        // Update progress bar width based on autoplay time left
        progressFill.style.width = (1 - progress) * 100 + "%";
      },
    },
  });
});

$(document).ready(function () {
  $("form#sendmail").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "/_ajax/send.php",
      data: $(this).serialize(),
      dataType: "json",
      success: function (response) {
        let SUCCESS = response.success;

        let WF = $(".js-wrap-send-form");
        let WR = WF.find(".js-res-send-form");

        let FORM = WF.find("form");

        if (SUCCESS) {
          WR.text(
            "Заявка успешно отправлена! В Ближайшее время с Вами свяжется менеджер."
          )
            .addClass("text-success")
            .show();
          FORM.remove();
        } else {
          WR.text("Ошибка! Проверьте правильность ввода и попробуйте ещё раз.")
            .addClass("text-danger")
            .show();
        }
      },
      error: function () {},
    });
  });

  $("form#get_test_cs").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "/_ajax/send.php",
      data: $(this).serialize(),
      dataType: "json",
      success: function (response) {
        let SUCCESS = response.success;

        let WF = $(".js-wrap-send-form-test");
        let WR = WF.find(".js-res-send-form-test");

        let FORM = WF.find("form");

        if (SUCCESS) {
          WR.text(
            "Заявка успешно отправлена! В Ближайшее время с Вами свяжется менеджер."
          )
            .addClass("text-success")
            .show();
          FORM.remove();
        } else {
          WR.text("Ошибка! Проверьте правильность ввода и попробуйте ещё раз.")
            .addClass("text-danger")
            .show();
        }
      },
      error: function () {},
    });
  });
});

$(function () {
  $("[data-code]").mouseenter(function () {
    $(".district span").html($(this).attr("data-title"));
    $(".district").show();
  });
  $("[data-code]").mouseleave(function () {
    if (!$(".rf-map").hasClass("open")) {
      $(".district").hide();
    }
  });
  /*$(".rf-map").on("click", "[data-code], .district-links div", function () {
        let id = $(this).attr("data-code");
        if ($("#" + id).text() != "") {
            $(".district").show();
            $(".district span").html($(this).attr("data-title"));
            $("[data-code]").addClass("dropfill");
            $(this).addClass("mainfill");
            $(".rf-map").addClass("open");
            $("#" + id).fadeIn();
        }
    });*/
  $(".close-district").click(function () {
    $(".rf-map").removeClass("open");
    $("[data-code]").removeClass("dropfill");
    $("[data-code]").removeClass("mainfill");
    $(".district-text").hide();
    $(".district").hide();
  });
  $("[data-code]").each(function () {
    let id = $(this).attr("data-code");
    let title = $(this).attr("data-title");
    if ($("#" + id).text() != "") {
      $(".district-links").append(
        '<div data-title="' +
          title +
          '" data-code="' +
          id +
          '">' +
          title +
          "</div>"
      );
    }
  });
});

// INITIALIZATION  SWIPER REFERENCE
const swiperReference = new Swiper(".swiper-reference-2", {
  loop: true,

  navigation: {
    nextEl: ".references-2__btns-item1",
    prevEl: ".references-2__btns-item2",
  },
  spaceBetween: 20,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },

    576: {
      slidesPerView: 2.5,
    },

    768: {
      slidesPerView: 3.5,
    },

    992: {
      slidesPerView: 5,
    },
  },

  autoplay: {
    delay: 3000,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const swiperReference2 = new Swiper(".swiper-reference-1", {
  loop: true,

  navigation: {
    nextEl: ".references-1__btns-item1",
    prevEl: ".references-1__btns-item2",
  },
  spaceBetween: 20,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },

    576: {
      slidesPerView: 2.5,
    },

    768: {
      slidesPerView: 3.5,
    },

    992: {
      slidesPerView: 5,
    },
  },

  autoplay: {
    delay: 3000,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

//Scroll reveal

window.sr = ScrollReveal();
sr.reveal(".reveal", { duration: 6000 });

(function () {
  "use strict";

  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
})();

const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const header = document.querySelector(".header");

const handleMenu = () => {
  document.body.classList.toggle("overflow-hidden");
  header.classList.toggle("menu-active");
};

menuBtn.addEventListener("click", handleMenu);
closeBtn.addEventListener("click", handleMenu);

window.addEventListener("click", (e) => {
  if (e.target !== menuBtn) {
    header.classList.remove("menu-active");
    document.body.classList.remove("overflow-hidden");
  }
});

const reviewContainer = document.querySelector(".customer-rewievs");
const reviewItems = document.querySelectorAll(".customer-rewievs_item");
const videoWrapper = document.querySelector(".video-wrapper");
const frameVideo = document.querySelector(".customer-rewievs_video");

const handleVideo = (item) => {
  reviewContainer.classList.toggle("active");
  document.documentElement.classList.toggle("overflow-hidden");
  frameVideo.classList.toggle("hidden-video");

  if (!reviewContainer.classList.contains("active")) {
    frameVideo.src = "";
  } else {
    frameVideo.src = item.dataset.video_src;
  }
};

reviewItems?.forEach((item) => {
  item.addEventListener("click", () => handleVideo(item));
});

videoWrapper?.addEventListener("click", handleVideo);
