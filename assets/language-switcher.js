(function(){
  const SUPPORTED = ['en','ar','fr'];
  const DEFAULT = 'en';

  const dict = {
    en:{
      'nav.home':'Home','nav.destinations':'Destinations','nav.offers':'Offers','nav.experience':'Experience','nav.news':'Latest news','nav.cargo':'Cargo','nav.membership':'Membership',
      'cta.login':'Members Login','tabs.book':'Book flight','tabs.manage':'Manage booking','tabs.checkin':'Check-in','tabs.status':'Flight status',
      'trip.rt':'Round-trip','trip.ow':'One-way','form.from':'From','form.to':'To','form.dep':'Departure','form.ret':'Return','form.guests':'Guests',
      'cta.search':'Search','footer.why':'Why Elite Air','footer.careers':'Careers','footer.contact':'Contact'
    },
    ar:{
      'nav.home':'الرئيسية','nav.destinations':'الوجهات','nav.offers':'العروض','nav.experience':'التجربة','nav.news':'آخر الأخبار','nav.cargo':'الشحن','nav.membership':'العضوية',
      'cta.login':'دخول الأعضاء','tabs.book':'حجز رحلة','tabs.manage':'إدارة الحجز','tabs.checkin':'تسجيل الوصول','tabs.status':'حالة الرحلة',
      'trip.rt':'ذهاب وعودة','trip.ow':'ذهاب فقط','form.from':'من','form.to':'إلى','form.dep':'المغادرة','form.ret':'العودة','form.guests':'الضيوف',
      'cta.search':'بحث','footer.why':'ليش إيليت إير','footer.careers':'وظايف','footer.contact':'تواصل',
    },
    fr:{
      'nav.home':'Accueil','nav.destinations':'Destinations','nav.offers':'Offres','nav.experience':'Expérience','nav.news':'Dernières nouvelles','nav.cargo':'Fret','nav.membership':'Abonnement',
      'cta.login':'Espace membres','tabs.book':'Réserver un vol','tabs.manage':'Gérer la réservation','tabs.checkin':'Enregistrement','tabs.status':'Statut du vol',
      'trip.rt':'Aller-retour','trip.ow':'Aller simple','form.from':'De','form.to':'À','form.dep':'Départ','form.ret':'Retour','form.guests':'Passagers',
      'cta.search':'Rechercher','footer.why':'ليش إيليت إير','footer.careers':'Carrières','footer.contact':'Contact',
    }
  };

  const $wrap = document.getElementById('lang-switch');
  const $btn  = document.getElementById('lang-btn');
  const $list = document.getElementById('lang-list');
  const $cur  = document.getElementById('lang-current');

  function applyLocale(lang){
    const pack = dict[lang] || dict[DEFAULT];
    document.documentElement.lang = lang;
    const rtl = (lang==='ar'); 
    document.documentElement.dir = rtl ? 'rtl' : 'ltr'; 
    document.body.style.direction = rtl ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k = el.getAttribute('data-i18n'); 
      if(pack[k]) el.textContent = pack[k];
    });
  }

  const saved = localStorage.getItem('ea_locale') || DEFAULT;
  $cur.textContent = saved.toUpperCase();
  [...$list.children].forEach(li => 
    li.setAttribute('aria-selected', li.dataset.lang === saved ? 'true' : 'false')
  );
  applyLocale(saved);

  $btn.addEventListener('click', () => {
    const open = $wrap.classList.toggle('open');
    $btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.addEventListener('click', (e) => {
    if(!$wrap.contains(e.target)){
      $wrap.classList.remove('open');
      $btn.setAttribute('aria-expanded','false');
    }
  });

  $list.addEventListener('click', (e) => {
    const li = e.target.closest('li'); 
    if(!li) return;
    const lang = li.dataset.lang;
    localStorage.setItem('ea_locale', lang);
    $cur.textContent = lang.toUpperCase();
    applyLocale(lang);
  });
})();
