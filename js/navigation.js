document.addEventListener('DOMContentLoaded', function () {
  loadNav();
  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll('.pagenav').forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document
          .querySelectorAll('.pagenav a')
          .forEach(function (elm) {
            elm.addEventListener('click', function (event) {
              // Muat konten halaman yang dipanggil
              page = event.target.getAttribute('href').substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open('GET', 'navigation.html', true);
    xhttp.send();
  }
  
  
  // Load page content
  var page = window.location.hash.substr(1);
  if (page == '') page = 'home';
  loadPage(page);

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        var content = document.querySelector('#page-content');
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = '<p>Halaman tidak ditemukan.</p>';
        } else {
          content.innerHTML = '<p>Ups.. halaman tidak dapat diakses.</p>';
        }
      }
    };
    xhttp.open('GET', 'pages/' + page + '.html', true);
    xhttp.send();
  }
});
