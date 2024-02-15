import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'; // Asegúrate de importar el plugin de React aquí



// Plugin personalizado para definir `global`
const defineGlobalPlugin = () => {
    return {
      name: 'define-global',
      config: () => ({
        define: {
          global: 'window'
        }
      })
    };
  };

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        react(), // Y luego usarlo aquí
        defineGlobalPlugin()
    ],
    server: {
        proxy: {
            '/api': 'http://localhost' // Asegúrate de reemplazar esto con la URL de tu proyecto de Laravel
        }
        
    }
});


