if (document.getElementById('__vwo_exporter')) {
  const iframe = document.getElementById('__vwo_exporter');
  iframe.style.right = '-400px';

  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 300);
} else {
  const iframe = document.createElement('iframe');
  iframe.style.background = 'white';
  iframe.style.height = '100%';
  iframe.style.width = '400px';
  iframe.style.position = 'fixed';
  iframe.style.top = '0px';
  iframe.style.right = '-400px';
  iframe.style.zIndex = '9000000000000000000';
  iframe.style.transition = 'all 300ms ease';
  iframe.frameBorder = 'none';
  iframe.src = chrome.runtime.getURL('popup.html');
  iframe.id = '__vwo_exporter';

  document.body.appendChild(iframe);
  setTimeout(() => {
    iframe.style.right = '0';
  }, 300);
}
