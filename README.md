# 🎨 Nuvia Gradient Generator

Generador de gradientes estáticos y animados con exportación a imágenes PNG y videos WebM. Ideal para creadores de contenido, diseñadores y desarrolladores que necesitan fondos de alta calidad para sus proyectos.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Características

### 🎨 Generación de Gradientes
- **Gradientes Estáticos**: Linear, radial y cónico con control total de ángulo
- **Gradientes Animados**: Efectos blob fluidos con animaciones suaves
- **Paleta de Colores**: Hasta 4 colores por gradiente
- **Paletas Guardadas**: Guarda tus combinaciones favoritas en localStorage
- **Paletas Pre-cargadas**: 12+ paletas profesionales listas para usar

### 📐 Formatos Disponibles
- **16:9** - Ideal para YouTube, presentaciones
- **9:16** - Perfecto para TikTok, Instagram Reels, Stories
- **4:3** - Formato clásico
- **1:1** - Instagram posts, avatares
- **Círculo** - Logos, decoraciones

### 🎛️ Controles Avanzados

#### Gradientes Estáticos
- Control de ángulo (0-360°)
- Desenfoque ajustable (0-20px)
- Opacidad configurable (0-100%)

#### Videos Animados
- Duración: 3-30 segundos
- FPS: 24-60 frames por segundo
- Calidad: 2-20 Mbps

### 💾 Exportación
- **PNG de alta calidad** para gradientes estáticos
- **WebM videos** para gradientes animados
- Sin marca de agua
- Resoluciones optimizadas según formato

## 🚀 Instalación

### Requisitos Previos
- Node.js 18+ 
- npm o pnpm

### Pasos de Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/nuvia-tools.git

# Navegar al directorio
cd nuvia-tools

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con hot reload

# Producción
npm run build        # Genera build optimizado en /dist
npm run preview      # Preview del build de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint para verificar código
```

## 📦 Tecnologías

- **React 19** - Framework UI
- **Vite 7** - Build tool ultrarrápido
- **Tailwind CSS 4** - Estilos con utility-first
- **html-to-image** - Exportación de imágenes
- **MediaRecorder API** - Grabación de videos

## 🎯 Casos de Uso

### Para Creadores de Contenido
- ✅ Fondos para thumbnails de YouTube
- ✅ Backgrounds para videos de TikTok/Reels
- ✅ Overlays para streams
- ✅ Fondos animados para intro/outro
- ✅ Texturas para motion graphics

### Para Desarrolladores
- ✅ Prototipar diseños rápidamente
- ✅ Generar assets para proyectos
- ✅ Testing de combinaciones de colores
- ✅ Referencias visuales para implementación CSS

### Para Diseñadores
- ✅ Explorar paletas de colores
- ✅ Crear mockups
- ✅ Fondos para presentaciones
- ✅ Assets para redes sociales

## 📖 Guía de Uso

### 1. Seleccionar Tipo de Gradiente
Elige entre **Imagen** (estático) o **Animado** en el panel izquierdo.

### 2. Elegir Formato
Selecciona el aspect ratio que necesites: 16:9, 9:16, 4:3, 1:1 o círculo.

### 3. Configurar Colores
- Haz clic en los selectores de color para elegir tonos
- Agrega hasta 4 colores con el botón "+"
- Elimina colores con el icono "X"
- Guarda tus paletas favoritas con el botón "Guardar"

### 4. Ajustar Parámetros

**Para gradientes estáticos:**
- Tipo: Linear, Radial o Cónico
- Ángulo: Dirección del gradiente
- Desenfoque: Suavidad de transiciones
- Opacidad: Transparencia general

**Para gradientes animados:**
- Duración del video (3-30s)
- FPS (24-60)
- Calidad/Bitrate (2-20 Mbps)

### 5. Exportar
- **Imagen**: Descarga PNG de alta resolución
- **Video**: Genera archivo WebM con animación

## 🌐 Despliegue

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Deploy la carpeta dist/
netlify deploy --prod --dir=dist
```

### GitHub Pages

```bash
# Configurar base en vite.config.js
base: '/nombre-repo/'

# Build y deploy
npm run build
git subtree push --prefix dist origin gh-pages
```

## 🔧 Configuración

### Variables de Entorno (Opcional)

Crea un archivo `.env` en la raíz:

```env
# No se requieren variables de entorno por ahora
# Pero puedes agregar si integras analytics, etc.
VITE_APP_NAME=Nuvia Gradient Generator
```

## 📱 Compatibilidad

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+
- ⚠️ IE11 no soportado

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- Diseño inspirado en herramientas modernas de gradientes
- Iconos de Bootstrap Icons
- Paletas de colores curadas manualmente

## 📞 Contacto

- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

## 🗺️ Roadmap

- [ ] Compartir paletas vía URL
- [ ] Exportar código CSS del gradiente
- [ ] Más formatos de exportación (SVG, MP4)
- [ ] Tema oscuro
- [ ] Historial de gradientes generados
- [ ] Shortcuts de teclado
- [ ] PWA para uso offline

---

Hecho con 💜 por el equipo de Nuvia
