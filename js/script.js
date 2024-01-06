"use strict";

window.addEventListener("DOMContentLoaded", () => {
  fix100vh();
  findHeight();
  animation();
  window.addEventListener("resize", () => {
    fix100vh();
    findHeight();
  });
});

let promo = document.querySelector(".promo");

function fix100vh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function findHeight() {
  let fullHeight = document.documentElement.clientHeight,
    fullWidth = document.documentElement.clientWidth;
  if (fullWidth > 768 && fullWidth <= 1024) {
    if (fullHeight < 730) {
      promo.classList.add("no-full");
    } else {
      if (promo.classList.contains("no-full")) {
        promo.classList.remove("no-full");
      }
    }
  } else if (fullWidth > 576 && fullWidth <= 768) {
    if (fullHeight < 700) {
      promo.classList.add("no-full");
    } else {
      if (promo.classList.contains("no-full")) {
        promo.classList.remove("no-full");
      }
    }
  } else if (fullWidth <= 576) {
    if (fullHeight < 700) {
      promo.classList.add("no-full");
    } else {
      if (promo.classList.contains("no-full")) {
        promo.classList.remove("no-full");
      }
    }
  }
}

function animation() {
  gsap.registerPlugin(ScrollTrigger);

  function animSmall() {
    // mobile setup code here...
    const tlPromo = gsap.timeline({});

    //для первых экранов лучше использовать метод to и учитывать это в CSS
    tlPromo
      .to(".promo__title span:first-child", {
        duration: 1.2,
        x: 0,
        ease: "back.out(1.1)",
      })
      .to(
        ".promo__title span:last-child",
        {
          duration: 1.2,
          x: 0,
          ease: "back.out(1.1)",
        },
        "<"
      );

    const tlImages = gsap.timeline({
      scrollTrigger: {
        trigger: ".promo",
        start: "top top",
        end: "+=50%",
        scrub: 1,
      },
    });

    tlImages
      .to(".promo__bottom", {
        opacity: 1,
        y: 0,
      })
      .fromTo(".promo__bottom img", { y: -80 }, { y: 40 }, "<");

    const tlLines = gsap.timeline({
      scrollTrigger: {
        trigger: ".choose__wrap",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    tlLines
      .to(".choose__wrap .top", {
        xPercent: -60,
      })
      .to(
        ".choose__wrap .bottom",
        {
          // duration: 1,
          xPercent: 12,
        },
        "<"
      );

    gsap.from(".rates__wrap", {
      yPercent: 50,
      scrollTrigger: {
        trigger: ".rates",
        start: "top 80%",
        end: "bottom bottom",

        scrub: true,
      },
    });

    const tlPoint = gsap.timeline({
      scrollTrigger: {
        trigger: ".point",
        start: "top center",
        end: "+=400",
        toggleActions: "play reverse play reverse", //1
      },
    });
    tlPoint
      .to(".point", { backgroundColor: "#000" })
      .to(".point__title", { color: "#fff" }, "<")
      .to(".point__descr", { color: "#fff" }, "<");

    const tlPointImg = gsap.timeline({
      scrollTrigger: {
        trigger: ".point__wrapper",
        start: "top center",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tlPointImg.to(".point__img:first-child img", { scale: 1 });
    tlPointImg.to(".point__img:last-child img", { scale: 0 }, "<");

    gsap.to(".footer__point", {
      y: 0,
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom 70%",
        scrub: true,
      },
    });

    const tlFooter = gsap.timeline({
      scrollTrigger: {
        trigger: "footer",
        start: "top 70%",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tlFooter
      .to(".footer__point", {
        scale: 1,
      })
      .to(
        ".footer__point svg path",
        {
          fill: "#ff0027",
          opacity: 1,
        },
        "<"
      );
  }

  let mediaAnimation = gsap.matchMedia();

  mediaAnimation.add("(min-width: 1025px)", () => {
    // desktop setup code here...
    const tlPromo = gsap.timeline({});

    //для первых экранов лучше использовать метод to и учитывать это в CSS
    tlPromo
      .to(".promo__title span:first-child", {
        duration: 1.2,
        x: 0,
        ease: "back.out(1.1)",
      })
      .to(
        ".promo__title span:last-child",
        {
          duration: 1.2,
          x: 0,
          ease: "back.out(1.1)",
        },
        "<"
      );

    const tlImages = gsap.timeline({
      scrollTrigger: {
        trigger: ".promo",
        start: "top top",
        end: "+=50%",
        scrub: 1,
        pin: true,
        // markers: true,
      },
    });

    tlImages
      .to(".promo__bottom", {
        opacity: 1,
        y: 0,
      })
      .fromTo(".promo__bottom img", { y: -80 }, { y: 40 }, "<");

    const tlLines = gsap.timeline({
      scrollTrigger: {
        trigger: ".choose__wrap",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    tlLines
      .to(".choose__wrap .top", {
        // duration: 1,
        xPercent: -60,
      })
      .to(
        ".choose__wrap .bottom",
        {
          // duration: 1,
          xPercent: 20,
        },
        "<"
      );

    gsap.from(".rates-card", {
      stagger: 0.3,
      // scrub: true,
      opacity: 0,
      yPercent: 100,
      scrollTrigger: {
        trigger: ".rates",
        start: "top 10%",
        toggleActions: "play none none reverse", //1
      },
    });

    let sections = gsap.utils.toArray(".plus__block");

    console.log(sections);
    console.log(sections.length);

    gsap.to(sections, {
      duration: 1,
      xPercent: -100 * (sections.length - 1),
      delay: 0.5,
      scrollTrigger: {
        trigger: ".plus",
        start: "top top",
        end: `+=${sections.length * 1000}`,
        pin: true,
        scrub: true,
        snap: 1 / (sections.length - 1), //почитать
      },
    });

    const tlPoint = gsap.timeline({
      scrollTrigger: {
        trigger: ".point",
        start: "top center",
        end: "bottom bottom",
        // scrub: true,
        // toggleClass: "black", //стили
        toggleActions: "play reverse play reverse", //1
      },
    });
    tlPoint
      .to(".point", { backgroundColor: "#000" })
      .to(".point__title", { color: "#fff" }, "<")
      .to(".point__descr", { color: "#fff" }, "<");

    const tlPointImg = gsap.timeline({
      scrollTrigger: {
        trigger: ".point__wrapper",
        start: "top top",
        // end: "",
        pin: true,
        scrub: 1,
      },
    });

    tlPointImg.to(".point__img:first-child img", { scale: 1 });
    // tlPointImg.to(".point__img:first-child img", { scale: 0 });

    tlPointImg.to(".point__img:last-child img", { scale: 0 }, "<");

    gsap.to(".footer__point", {
      y: 0,
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom 70%",
        scrub: true,
      },
    });

    const tlFooter = gsap.timeline({
      scrollTrigger: {
        trigger: "footer",
        start: "top 70%",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tlFooter
      .to(".footer__point", {
        scale: 1,
      })
      .to(
        ".footer__point svg path",
        {
          fill: "#ff0027",
          opacity: 1,
        },
        "<"
      );
  });

  mediaAnimation.add("(min-width: 577px) and (max-width: 1024px)", () => {
    animSmall();
  });

  mediaAnimation.add("(max-width: 576px)", () => {
    animSmall();
  });

}
