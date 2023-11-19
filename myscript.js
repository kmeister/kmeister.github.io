function followLink () {
           
    const deepLinkId = "deep_link";
    const direcLinkId = "direct_link";

    var deepLink = document.getElementById(deepLinkId);
    var direcLink = document.getElementById(direcLinkId);

    if (deepLink) {
        const deepLinkHref = deepLink.getAttribute("href");
        debugLog(`deepLinkHref: ${deepLinkHref}`);

        window.location.href = deepLinkHref;
    } 

    if (direcLink){
        const directLinkHref = direcLink.getAttribute("href");
        debugLog(`directLinkHref: ${directLinkHref}`);
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

    debugLog(`Lost focus at: ${blurTime}`);
})

window.addEventListener('focus', function() {
    const focusTime = performance.now();
    debugLog(`Gained focus at: ${focusTime}`);
  });
