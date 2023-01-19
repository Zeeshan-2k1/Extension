chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'OFF',
  });
  chrome.alarms.create('refresh', { periodInMinutes: 0.5 });
});

chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === 'ON' ? 'OFF' : 'ON';

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['contentScript.js'],
  });
});
