(function(document) {
  const config = {
    ogAppId: '256172254741882',
    siteDomain: 'https://ledevoir.com',
    twitterSiteHandle: '@ledevoir'
  };
  document.querySelectorAll('.social-buttons button').forEach(button => {
    switch(button.dataset['type'].toLowerCase()) {
      case 'facebook':
        button.addEventListener('click', shareOnFacebook);
        break;
      case 'twitter':
        button.addEventListener('click', shareOnTwitter);
        break;
    }
  });

  function shareOnFacebook() {
    const url = percentEncode(`http://www.facebook.com/dialog/feed?app_id=${config.ogAppId}` +
      `&link=${window.location.href}` +
      `&description=${document.querySelector('meta[property="og:description"]').getAttribute('content')}` +
      `&redirect_uri=${config.siteDomain}` +
      `&image=${document.querySelector('meta[property="og:image"]').getAttribute('content')}`);
    const settings = 'width=900,height=450,scrollbars=no,location=0,statusbars=0,menubars=0,toolbars=0,resizable=0';
    window.open(url, 'Publier sur Facebook', settings);
  }

  function shareOnTwitter() {
    const url = percentEncode(`https://twitter.com/intent/tweet?url=${window.location.href}` +
      `&text=${document.querySelector('meta[property="og:description"]').getAttribute('content')}` +
      `&related=${config.twitterSiteHandle}` +
      `&counturl=${window.location.hostname + window.location.pathname}`);
    const settings = 'width=500,height=300,scrollbars=no,location=0,statusbars=0,menubars=0,toolbars=0,resizable=0';
    window.open(url, 'Partager un lien sur Twitter', settings);
  }

  function percentEncode(string) {
    return string.replace(/#/g, '%23').replace(/,/g, '%2c').replace(/ /g, '%20');
  }
})(window.document);
