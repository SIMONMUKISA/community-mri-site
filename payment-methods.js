// Shared by donate.html and shop.html.
// To turn on an online payment option, paste its link (https://...) or handle below.
// Options left blank show as "Coming soon" placeholders on both pages.
var PAYMENT_METHODS = [
  { name: 'Credit or debit card', url: '', cta: 'by card',
    text: ' securely online with a credit or debit card.' },
  { name: 'PayPal', url: '', cta: 'with PayPal',
    text: ' with your PayPal balance, bank account, or card.' },
  { name: 'Venmo', url: '', handle: '', cta: 'with Venmo',
    text: ' on Venmo.' },
  { name: 'Cash App', url: '', handle: '', cta: 'with Cash App',
    text: ' on Cash App.' },
  { name: 'Zelle', handle: '',
    text: ' bank-to-bank with Zelle.' }
];

(function () {
  var host = document.getElementById('methods');
  if (!host) return;
  var verb = host.getAttribute('data-verb') || 'Give';
  PAYMENT_METHODS.forEach(function (m) {
    var hasLink = typeof m.url === 'string' && m.url.indexOf('https://') === 0;
    var hasHandle = typeof m.handle === 'string' && m.handle.trim() !== '';
    var live = hasLink || (m.name === 'Zelle' && hasHandle);

    var card = document.createElement('div');
    card.className = live ? 'method' : 'method soon';

    var h = document.createElement('h2');
    h.textContent = m.name;
    card.appendChild(h);

    var p = document.createElement('p');
    p.textContent = verb + m.text;
    if (live && hasHandle) {
      p.appendChild(document.createTextNode(' Send to: '));
      var s = document.createElement('span');
      s.className = 'handle';
      s.textContent = m.handle.trim();
      p.appendChild(s);
    }
    card.appendChild(p);

    if (!live) {
      var t = document.createElement('span');
      t.className = 'soon-tag';
      t.textContent = 'Coming soon';
      card.appendChild(t);
    } else if (hasLink) {
      var a = document.createElement('a');
      a.className = 'btn';
      a.href = m.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = verb + ' ' + m.cta;
      card.appendChild(a);
    }
    host.insertBefore(card, host.lastElementChild);
  });
})();
