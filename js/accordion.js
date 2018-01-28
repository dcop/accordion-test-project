window.Accordion = function (options) {
  var me = this;
  var instance;

  var config = {
    // GESTIONE DELL'HTML
    html: {
    // 1: titolo principale
      'mainTitle': '<h3 class="accordion-main-title">{{mainTitle}}</h3>',

      // 2: intestazione per ogni panel
      head: '<div class="panel-accordion">' +
              '<div class="panel-heading">' +
                '<div class="panel-text">',

      panel: {
        // 3: componente con titolo, sottotitolo e corpo da ripetere n volte
        title: '<div class="panel-title">{{title}}</div>',
        subtitle: '<div class="panel-subtitle">{{subtitle}}</div>',

        // 4: contenuto
        content: '    </div>' + // end .panel-text
                 '    <div class="icons">' +
                 '      <i class="material-icons icon-down">keyboard_arrow_down</i>' +
                 '      <i class="material-icons icon-up">keyboard_arrow_up</i>' +
                 '    </div>' + // end .icons
                 '</div>' + // end .panel-heading
                 '<div class="panel-content">' +
                    '<div class="panel-body">' +
                     '{{content}}' +
                    '</div>' + // end .panel-body
                  '</div>' // end .panel-content
      },

      // 5: fine
      bottom: '  </div>' // end .panel-accordion
    },

    mainTitle: options.mainTitle,
    container: options.container,
    panels: options.panels
  };

  /**
   * Gestione degli eventi
   */
  var attachEvents = function () {
    // Gestione del click sull'heading dell'accordion
    var collection = instance.querySelectorAll('.panel-heading');

    for(var i = 0; i<collection.length; i++) {
      var el = collection[i];
      el.onclick = function(e) {
        var target = e.currentTarget;
        var content = target.nextElementSibling;

        // calcola l'altezza del content panel per la transition
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }

        // aggiungi la classe "open" sul parent accordion per la spaziatura
        target.parentElement.classList.toggle('open');
      }
    }

    // Gestione classe per il sottotitolo se presente
    var headings = instance.querySelectorAll('.panel-subtitle');

    for(var i = 0; i<headings.length; i++) {
      var heading = headings[i];

      heading.parentElement.parentElement.classList.add('with-subtitle');
    }
  }

  /*
   * Creazione HTML in base alla config
   */
  var html = function() {

    var s = '';

    // titolo principale opzionale
    if(config.mainTitle) {
      s += config.html.mainTitle.replace('{{mainTitle}}', config.mainTitle);
    }

    // cicla sui panel
    for(var i in config.panels) {
      s += config.html.head;

      // secondo ciclo sulle proprietà: title, subtitle, content
      // esegui un check sull'esistenza visto che il subtitle può
      // non essere presente
      for(var p in config.panels[i]) {
        var prop = config.panels[i][p];

        if(prop) {
          s += config.html.panel[p].replace('{{' + p + '}}', prop);
        }
      }
      s += config.html.bottom;
    }

    instance.innerHTML = s;
    instance.classList.add("accordion");
  }

  /*
   * Inizializzazione elemento parent
   */
  var init = function() {
    instance = document.getElementById(config.container);
  }

  // metodi privati
  init();
  html();
  attachEvents();

  // me.getElement = function() {
  //   return instance;
  // }

  return me;
}
