import { withPluginApi } from 'discourse/lib/plugin-api'

export default {
  name: 'discourse-multilingual-post',
  initialize(container, app) {
    // If plugin is disabled, quit
    if (!app.SiteSettings['discourse_multilingual_post_enabled']) {
      return
    }

    const userLang = I18n.locale.substring(0, 2)
    const defaultLang = app.SiteSettings.default_locale.substring(0, 2)

    withPluginApi('0.8.30', api => {
      api.onPageChange(() =>{
          switchLangPost();
          switchLangAnywhere();
        }
      );
      function switchLangAnywhere() {
        const langElements = document.getElementsByClassName("dmp-lang");

        for (var i = 0; i < langElements.length; i++) {
         //console.log(langElements[i].lang);
          langElements[i].hidden = true;
          var langFound = false;
                
          if (userLang == langElements[i].lang) {
            langElements[i].hidden = false;
            var langFound = true;
          }
        }

        if (!langFound) {
          langElements[0].hidden = false;
        }
      }
    })
  }
}
