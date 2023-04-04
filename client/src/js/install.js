const butInstall = document.getElementById ('buttonInstall');

//this will store triggered events 
//button install will remove the hidden class from the button.
window.addEventListener ('beforeinstallprompt', (event) => {
    console.log ('hit')
    console.log ("event" + event)
    event.preventDefault();
    window.deferredPrompt = event;
    butInstall.classList.toggle ('hidden', false);
});

//here this will show the prompt
//but this will also reset the deferred prompt variable since it can only be used once
butInstall.addEventListener ('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    window.deferredPrompt = null;
    butInstall.classList.toggle ('hidden', true);
});

window.addEventListener ('appinstalled', (event) => {
    console.log ('install hit')
    window.deferredPrompt = null;
});