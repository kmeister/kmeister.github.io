

var appState = {
    focusCount: 0,
    blurCount: 0,
    deepLinkAttemptedAt: 0,
    direcLink: "",
    deepLink: "",
}


function isDesktop() {
    const userAgent = navigator.userAgent;
    return !/Mobi|Android|Tablet|iPad|iPhone|iPod/.test(userAgent);
  }

function followLink () {
           
    const deepLinkId = "deep_link";
    const direcLinkId = "direct_link";

    var deepLink = document.getElementById(deepLinkId);
    var direcLink = document.getElementById(direcLinkId);

    if (deepLink) {
        const deepLinkHref = deepLink.getAttribute("href");
        debugLog(`deepLinkHref: ${deepLinkHref}`);
        appState.deepLink = deepLinkHref

        if (!isDesktop()){
            debugLog('On Mobile');
            window.location.href=(deepLinkHref);

        } else {
            debugLog('On Desktop');
            window.location.href=(deepLinkHref);
        }
        
    } 

    if (direcLink){
        const directLinkHref = direcLink.getAttribute("href");
        debugLog(`directLinkHref: ${directLinkHref}`);
        appState.direcLink = directLinkHref;
    }

    
}

function debugLog(str){
    const logId = "log";

    var log = document.getElementById(logId);

    if (log) {
        log.innerText += `${str}\n\n`;
    } else {
        console.log(str);
    }
}


window.addEventListener('load', followLink)
window.addEventListener('blur', function() {
    const blurTime = performance.now();
    appState.blurCount += 1;
    debugLog(`Lost focus at: ${blurTime}, ${appState.blurCount} times`);
    
})

window.addEventListener('focus', function() {
    const focusTime = performance.now();
    appState.focusCount += 1;

    debugLog(`Gained focus at: ${focusTime}, ${appState.focusCount} times`);
    
    if (appState.focusCount < 2){ // first time you come back only
        setTimeout(() => { // wait 5 seconds to see what happened
            if (appState.blurCount === 1){ // it's been 5 seconds and you've still only lost focus once
                debugLog('Seems like the deeplink failed')
                this.window.location.assign(appState.direcLink);
            }
        }, 5000)
    }
    
  });
