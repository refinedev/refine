const path = require("path");

module.exports = function (context) {
    const { siteConfig } = context;
    const { themeConfig } = siteConfig;

    return {
        name: "@pankod/docusaurus-plugin-intercom",

        injectHtmlTags() {
            return {
                postBodyTags: [
                    {
                        tagName: "script",
                        innerHTML: `
                        window.intercomSettings = {
                            api_base: "https://api-iam.intercom.io",
                            app_id: "m6xbwbzo"
                        };
      
                        // We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/m6xbwbzo'
                        (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/m6xbwbzo';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
                        `,
                    },
                ],
            };
        },
    };
};
