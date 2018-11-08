function main() {
  let options = { zoom: 2.0, position: [51.00, 0.00] };
  let earth = new WE.map('earth_div', options);
  let url = 'http://api.open-notify.org/iss-now.json';
  let marker = WE.marker([51.00, 0.00])

  WE.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg',{
    attribution: '© OpenStreetMap contributors'
  }).addTo(earth);

  window.setInterval(function () {
    fetch(url)
      .then(res => res.json())
        .then((data) => {
          marker.remove
          marker.setLatLng([data.iss_position.latitude, data.iss_position.longitude])
          marker.addTo(earth)
          earth.setView([data.iss_position.latitude, data.iss_position.longitude])
        })
      .catch(err => { throw err });
  }, 1000)
}
