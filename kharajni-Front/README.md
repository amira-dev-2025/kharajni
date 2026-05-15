# Kharajni – Frontend React

> **Staying Ahead, Studying Abroad**

## 🚀 Lancer le projet

```bash
npm install
npm run dev
```

L'app tourne sur `http://localhost:5173`

## 📁 Structure

```
src/
├── context/
│   └── AuthContext.jsx       # État global de l'utilisateur connecté
├── components/
│   ├── Navbar.jsx / .module.css
│   └── Footer.jsx / .module.css
├── pages/
│   ├── Landing.jsx / .module.css   # Page d'accueil publique
│   ├── Login.jsx                   # Connexion (3 rôles)
│   ├── Register.jsx                # Inscription en 2 étapes
│   ├── Auth.module.css             # CSS partagé Login/Register
│   ├── Dashboard.jsx / .module.css # Tableau de bord étudiant
│   ├── Apply.jsx / .module.css     # Postuler à une école
│   └── Upload.jsx / .module.css    # Uploader des documents
├── styles/
│   └── globals.css                 # Variables CSS, reset, animations
├── App.jsx                         # Routes + ProtectedRoute
└── main.jsx                        # Entry point
```

## 🎨 Palette de couleurs

| Variable        | Valeur    | Usage                        |
|-----------------|-----------|------------------------------|
| `--dark`        | `#1F3A3A` | Fond principal, textes foncés |
| `--teal`        | `#387D7A` | Accent primaire, boutons      |
| `--mint`        | `#BEE3DB` | Accents clairs, badges        |
| `--foam`        | `#F4F9F8` | Fond général, inputs          |

## 👥 Rôles utilisateurs

- **Étudiant** – accès Dashboard, Postuler, Documents
- **Conseiller** – (extensible côté backend)
- **Administrateur** – (extensible côté backend)

## 🔗 Connexion au backend

Remplacez les données fictives par des appels `fetch()` vers vos endpoints API.

Exemple dans `Login.jsx` :
```js
const res = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, motDePasse, role })
})
const data = await res.json()
login(data.user)
```

## 📦 Dépendances

- React 18 + React Router DOM 6
- Lucide React (icônes)
- Vite (bundler)
