tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#6750A4',
                    dark: '#D0BCFF'
                },
                onPrimary: {
                    light: '#FFFFFF',
                    dark: '#381E72'
                },
                primaryContainer: {
                    light: '#EADDFF',
                    dark: '#4F378B'
                },
                onPrimaryContainer: {
                    light: '#21005D',
                    dark: '#EADDFF'
                },
                surface: {
                    light: '#FEF7FF',
                    dark: '#141218'
                },
                onSurface: {
                    light: '#1D1B20',
                    dark: '#E6E0E9'
                },
                surfaceVariant: {
                    light: '#E7E0EC',
                    dark: '#49454F'
                },
                onSurfaceVariant: {
                    light: '#49454F',
                    dark: '#CAC4D0'
                },
                outline: {
                    light: '#79747E',
                    dark: '#938F99'
                }
            },
            fontFamily: {
                roboto: ['Roboto', 'sans-serif']
            },
            boxShadow: {
                'md1': '0 1px 2px 0 rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)',
                'md2': '0 1px 2px 0 rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)',
                'md3': '0 1px 3px 0 rgba(0,0,0,0.3), 0 4px 8px 3px rgba(0,0,0,0.15)'
            }
        }
    }
};