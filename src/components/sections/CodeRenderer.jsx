/**
 * Componente para renderizar código con coloreado de sintaxis
 */
function CodeRenderer({ code, codeMode }) {
    const lines = code.split('\n');

    const renderColoredCode = () => {
        return lines.map((line, index) => {
            // Comentarios
            if (line.trim().startsWith('/*') || line.trim().startsWith('<!--') || line.trim().includes('*/') || line.trim().includes('-->')) {
                return <div key={index} className="text-gray-500">{line}</div>;
            }
            // HTML tags
            if (line.includes('<') || line.includes('>') || line.includes('</')) {
                return <div key={index} className="text-yellow-400">{line}</div>;
            }
            // Selectores CSS
            if (line.includes('{') || line.match(/^\.[a-zA-Z-]+/) || line.match(/^@keyframes/)) {
                return <div key={index} className="text-pink-400">{line}</div>;
            }
            // Propiedades CSS
            if (line.includes(':') && !line.includes('//')) {
                const parts = line.split(':');
                return (
                    <div key={index}>
                        <span className="text-cyan-400">{parts[0]}</span>
                        <span className="text-white">:</span>
                        <span className="text-orange-300">{parts.slice(1).join(':')}</span>
                    </div>
                );
            }
            // Clases Tailwind
            if (codeMode === "tailwind" && line.trim() && !line.includes('/*') && !line.includes('<')) {
                // Detectar diferentes tipos de clases
                if (line.includes('bg-gradient') || line.includes('from-') || line.includes('to-') || line.includes('via-')) {
                    return <div key={index} className="text-purple-400">{line}</div>;
                }
                if (line.includes('bg-[')) {
                    return <div key={index} className="text-pink-400">{line}</div>;
                }
                if (line.includes('opacity-') || line.includes('blur-')) {
                    return <div key={index} className="text-cyan-400">{line}</div>;
                }
                return <div key={index} className="text-green-400">{line}</div>;
            }
            // Otros (llaves, etc)
            return <div key={index} className="text-gray-300">{line}</div>;
        });
    };

    return (
        <div className="bg-neutral-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm font-mono">
                <code>
                    {renderColoredCode()}
                </code>
            </pre>
        </div>
    );
}

export default CodeRenderer;


