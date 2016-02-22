(() => {
  const lb = document.querySelector('.lb');
  const socialLinks = document.querySelector('.js-social');
  const lbimg = lb.getAttribute('src');

  const toggleSocial = (e) => {
    let target = e.target;

    if(target.hasAttribute('data-img-ref')) {
      let ref = target.getAttribute('data-img-ref');
      lb.setAttribute('src', `/img/${ref}-logo.svg`);
    }
  };

  const revertLb = () => {
    lb.setAttribute('src', lbimg);
  };

  socialLinks.addEventListener('mouseover', toggleSocial);
  socialLinks.addEventListener('mouseout', revertLb);

})();
