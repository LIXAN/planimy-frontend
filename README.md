# Stratos Frontend 🏙️

[English Version Below](#english-version)

Stratos es un SaaS (Software as a Service) Inmobiliario diseñado para optimizar y gestionar la administración de proyectos habitacionales y apartamentos.

## 🚀 Estado Actual y Funcionalidades Principales

En su versión actual, el frontend de Stratos actúa como el portal de gestión y administración integrado con un backend en FastAPI. Las funciones principales actualmente desarrolladas incluyen:

*   **Autenticación y Autorización:** Sistema de login seguro con tokens JWT. Redirección automática a dashboards protegidos y persistencia de sesión.
*   **Gestión de Proyectos Inmobiliarios:** Visualización de proyectos habitacionales en formato de tabla interactiva o mediante tarjetas resumen. Permite ver el estado detallado de cada entorno.
*   **Administración de Apartamentos:** Interfaz detallada para filtrar (por VIS/NO VIS, número de habitaciones, estrato, área), ordenar y consultar el catálogo de apartamentos disponibles a través de modales rápidos y tablas de datos avanzadas.
*   **Diseño Web Responsivo e Interactivo:** Una interfaz de usuario moderna (UI) con menús laterales ocultables (sidebars), notificaciones dinámicas en pantalla, soporte para modos claro/oscuro integrados y micro-animaciones en botones y filas de tabla.

## 🛠️ Stack Tecnológico

Este frontend está construido utilizando las siguientes tecnologías y herramientas modernas:

*   **React (v19):** Librería principal para construir la interfaz de usuario basada en componentes reutilizables.
*   **TypeScript:** Lenguaje tipado superset de JavaScript para un código más robusto, predecible y fácil de mantener.
*   **Vite:** Herramienta de compilación ultrarrápida (Bundler) que reemplaza a Webpack, ofreciendo recargas en caliente automáticas (HMR) casi instantáneas durante el desarrollo local.
*   **React Router DOM (v7):** Herramienta para gestionar la navegación entre las diferentes páginas de la aplicación sin tener que recargar el navegador Web.
*   **Tailwind CSS (v3.4):** Framework CSS basado en utilidades que permite diseñar estructuras visuales complejas directamente dentro del código de los componentes (clases en línea), sin tener que saltar entre archivos de estilos separados.
*   **Axios:** Cliente HTTP basado en promesas utilizado para realizar todas las comunicaciones y transferencias de transferencias de datos mediante la API RESTful del backend.

## 💻 Desarrollo Local

Para correr este proyecto en tu entorno local:

1.  Asegúrate de tener Node.js instalado.
2.  Clona este repositorio.
3.  Instala las dependencias ejecutando: `npm install`
4.  Levanta el servidor de desarrollo local ejecutando: `npm run dev`

---

# <a id="english-version"></a>Stratos Frontend 🏙️

Stratos is a Real Estate SaaS (Software as a Service) designed to optimize and manage the administration of housing projects and apartments.

## 🚀 Current Status and Core Features

In its current version, the Stratos frontend acts as the management and administration portal integrated with a FastAPI backend. The main features currently developed include:

*   **Authentication & Authorization:** Secure login system using JWT tokens. Features automatic redirection to protected dashboards and robust session persistence.
*   **Real Estate Project Management:** Visualization of housing developments in interactive table formats or through summary cards. Allows viewing the detailed status of each environment.
*   **Apartment Administration:** Detailed interface for filtering (by VIS/NO VIS tags, number of bedrooms, socioeconomic stratum, area), sorting, and consulting the catalog of available apartments via rapid-access modals and advanced data tables.
*   **Responsive & Interactive Web Design:** A modern user interface (UI) featuring collapsible sidebars, dynamic on-screen toast notifications, integrated light/dark mode support, and fluid micro-animations on buttons and table rows.

## 🛠️ Technology Stack

This frontend is built using the following modern web technologies and tools:

*   **React (v19):** Core library for building the user interface based on reusable modular components.
*   **TypeScript:** Strictly typed superset of JavaScript providing a more robust, predictable, and maintainable codebase.
*   **Vite:** Ultra-fast next-generation build tool (Bundler) that replaces Webpack, offering near-instantaneous Hot Module Replacement (HMR) during local development.
*   **React Router DOM (v7):** Tool for comprehensively managing navigation and routing between different application pages without requiring full browser reloads.
*   **Tailwind CSS (v3.4):** A utility-first CSS framework that allows designing complex visual structures directly within component code (inline classes), removing the need to context-switch to separate CSS stylesheet files.
*   **Axios:** Promise-based HTTP client used to perform all network communications and data transfers with the RESTful backend API.

## 💻 Local Development

To run this project in your local environment:

1.  Ensure you have Node.js installed on your system.
2.  Clone this repository.
3.  Install all required dependencies by running: `npm install`
4.  Start the local development server by running: `npm run dev`
