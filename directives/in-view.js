import Vue from "vue";

Vue.directive('in-view',{
  inserted: (el, binding, vnode) => {
      let f = function() {
        let top = el.getBoundingClientRect().top;
				let inView = top >= 0 && top - window.innerHeight < 0
        if (inView) {
          el.classList.add('someClass');
          window.removeEventListener('scroll', f)
        }
      };
      window.addEventListener('scroll', f)
    },
})