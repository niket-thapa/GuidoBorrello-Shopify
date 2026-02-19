/**
 * Animate on scroll – same as reference (static-html/index.html)
 * Observes .aos-group and .aos elements and adds .aos-in when they enter viewport.
 */
(function () {
  var defaultMargin = '-60px';
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add('aos-in');
      if (el.classList.contains('aos-group')) {
        var children = el.querySelectorAll('.aos');
        children.forEach(function (c) { c.classList.add('aos-in'); });
      }
      observer.unobserve(el);
    });
  }, { rootMargin: defaultMargin + ' 0px ' + defaultMargin + ' 0px', threshold: 0 });

  document.querySelectorAll('.aos-group').forEach(function (g) {
    var m = g.getAttribute('data-aos-margin');
    if (m !== null) {
      var opt = { rootMargin: m + 'px 0px ' + m + 'px 0px', threshold: 0 };
      var o = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          el.querySelectorAll('.aos').forEach(function (c) { c.classList.add('aos-in'); });
          o.unobserve(el);
        });
      }, opt);
      o.observe(g);
    } else {
      observer.observe(g);
    }
  });

  document.querySelectorAll('.aos:not(.hero-item)').forEach(function (el) {
    if (el.closest('.aos-group')) return;
    var margin = el.getAttribute('data-aos-margin') || (el.closest('[data-aos-margin]') && el.closest('[data-aos-margin]').getAttribute('data-aos-margin')) || defaultMargin;
    var m = (margin === null || margin === '') ? defaultMargin : margin + 'px';
    var o = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('aos-in');
        o.unobserve(entry.target);
      });
    }, { rootMargin: m + ' 0px ' + m + ' 0px', threshold: 0 });
    o.observe(el);
  });
})();
