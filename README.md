# Lumière Fine Art Gallery

A curated, responsive web exhibition showcasing world-renowned historical paintings from the High Renaissance, Dutch Golden Age, Post-Impressionism, Expressionism, and Symbolism. Built using semantic HTML5, modern CSS3 (Flexbox & CSS Grid), and vanilla JavaScript.

## 🌐 Submission Links

- **GitHub Repository**: [https://github.com/joshua225773/art-gallery](https://github.com/joshua225773/art-gallery)
- **Live Hosted Site (GitHub Pages)**: [https://joshua225773.github.io/art-gallery/](https://joshua225773.github.io/art-gallery/)

---

## 📄 Page Directory (10 Distinct Pages)

1. **Gallery Home Page (`index.html`)**
   - Hero banner highlighting the autumn exhibition, curatorial statistics, and featured masterpiece preview.
   - Art movement overview cards with direct categorical filtering links.
   - Exhibition preview grid and newsletter membership dispatch.

2. **Login Page (`login.html`)**
   - Member authentication form with email and password inputs.
   - Interactive show/hide password toggle.
   - Client-side credentials validation via `localStorage` with error handling.
   - Quick one-click demo login button for rapid evaluator review (`demo@gallery.org` / `password123`).

3. **SignUp Page (`signup.html`)**
   - Membership registration form with full name, email, art movement preference selector, and password confirmation.
   - Validation for matching passwords and password length.
   - Persistent account registration saving directly into browser `localStorage`.

4. **Art Display Page (`artworks.html`)**
   - Catalogs all 9 featured masterpieces with high-resolution imagery, artist names, creation years, and direct navigation links to each piece's dedicated individual page.
   - Real-time category filter tabs (*Post-Impressionism, Renaissance, Dutch Golden Age, Expressionism, Symbolism*).
   - Live search input dynamically filtering by title, artist name, or era.

5. **Individual Artwork 1: The Starry Night (`the-starry-night.html`)**
   - Vincent van Gogh (1889), Post-Impressionism.
   - Framed image with fullscreen zoom modal, interactive favorites counter, and audio commentary simulator.
   - Detailed specifications table and curatorial essay.
   - 3 Similar Artworks in Post-Impressionism: *Sunflowers*, *Café Terrace at Night*, *A Sunday on La Grande Jatte*.

6. **Individual Artwork 2: Mona Lisa (`mona-lisa.html`)**
   - Leonardo da Vinci (1503–1519), High Renaissance.
   - Specifications (Louvre provenance, sfumato technique, dimensions, subject).
   - Curatorial analysis of Lisa Gherardini's expression and atmospheric background.
   - 3 Similar Artworks in the Renaissance: *The Birth of Venus*, *The School of Athens*, *Lady with an Ermine*.

7. **Individual Artwork 3: The Scream (`the-scream.html`)**
   - Edvard Munch (1893), Expressionism.
   - Specifications (National Gallery Oslo, tempera/pastel on cardboard, dimensions).
   - Historical background on Munch's diary entry and existential modern anxiety.
   - 3 Similar Artworks in Expressionism: *Self-Portrait with Physalis* (Egon Schiele), *Street, Berlin* (Ernst Ludwig Kirchner), *Madonna* (Edvard Munch).

8. **Individual Artwork 4: Girl with a Pearl Earring (`girl-with-pearl-earring.html`)**
   - Johannes Vermeer (1665), Dutch Golden Age.
   - Specifications (Mauritshuis collection, tronie genre, lapis lazuli ultramarine).
   - Analysis of light reflection on the droplet pearl and intimate turning pose.
   - 3 Similar Artworks in the Dutch Golden Age: *The Night Watch*, *The Milkmaid*, *The Astronomer*.

9. **Individual Artwork 5: The Kiss (`the-kiss.html`)**
   - Gustav Klimt (1907–1908), Symbolism & Art Nouveau.
   - Specifications (Belvedere Vienna, Golden Phase, gold leaf on square canvas).
   - Analysis of Byzantine mosaic influences, geometric motifs, and the meadow cliff.
   - 3 Similar Artworks in Symbolism & Art Nouveau: *Portrait of Adele Bloch-Bauer I*, *The Tree of Life*, *The Yellow Christ*.

10. **About & Visitor Information Page (`about.html`)**
    - Gallery mission, curatorial philosophy, physical & virtual visitor opening hours, admission details, and contact directory.

---

## 🛠️ Technical Highlights

- **Semantic HTML5**: Native tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<table>`, `<footer>`) ensuring clean document outline, accessibility, and high SEO friendliness.
- **Custom CSS3 Styling**: Clean, maintainable architecture using CSS custom variables (`:root`), flexbox, and responsive grid layouts (`repeat(auto-fill, minmax(...))`). No heavy external frameworks needed.
- **Vanilla JavaScript**: Lightweight, modular scripts handling client-side session management, form validation, filter state, and Web Speech API audio tour simulation.
- **Responsive Design**: Fluid breakpoints tailored for mobile, tablet, and desktop viewing with an animated hamburger menu on small viewports.
- **Public Domain Imagery**: All artwork plates sourced with attribution from Wikimedia Commons and Google Cultural Institute archives.

---

## 🚀 Running the Project Locally

No build tools, bundlers, or servers required:
1. Clone the repository:
   ```bash
   git clone https://github.com/joshua225773/art-gallery.git
   cd art-gallery
   ```
2. Double-click or open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

---

## 👤 Author

- **Curated & Developed by**: Joshua Antony (`joshua225773@sahrdaya.ac.in`)
