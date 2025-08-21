function requestLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ error: 'Geolocation not supported.' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({ status: 'allowed', coords: position.coords });
      },
      (error) => {
        resolve({ status: 'denied', error: error.message });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}

(async () => {
  const result = await requestLocation();

  // Optional: log or handle result if needed
  console.log('Location result:', result);

  // Redirect user no matter what
  window.location.href = "/dox";
})();
