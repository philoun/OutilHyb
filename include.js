function includeHTML() {
  const elements = document.querySelectorAll('[w3-include-html]');
  elements.forEach(el => {
    const file = el.getAttribute('w3-include-html');
    if (file) {
      fetch(file)
        .then(response => {
          if (response.ok) return response.text();
          throw new Error(`Erreur lors du chargement de ${file}`);
        })
        .then(data => {
          el.innerHTML = data;
          el.removeAttribute('w3-include-html');
          includeHTML(); // appel récursif pour gérer plusieurs includes
        })
        .catch(err => {
          el.innerHTML = `Erreur de chargement du fichier : ${file}`;
          console.error(err);
        });
    }
  });
}
