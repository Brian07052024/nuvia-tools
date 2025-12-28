/**
 * Componente para renderizar código con coloreado de sintaxis
 */
function CodeRenderer({ code, codeMode }) {
    const lines = code.split('\n');

    const renderColoredCode = () => {
        return lines.map((line, index) => {
            const trimmedLine = line.trim();
            
            // Comentarios completos (toda la línea es comentario)
            if ((trimmedLine.startsWith('/*') && trimmedLine.endsWith('*/')) || 
                trimmedLine.startsWith('<!--') || 
                trimmedLine.endsWith('-->')) {
                return <div key={index} className="text-gray-500">{line}</div>;
            }
            
            // HTML tags
            if (line.includes('<') && (line.includes('>') || line.includes('/>'))) {
                return <div key={index} className="text-yellow-400">{line}</div>;
            }
            
            // Selectores CSS (.clase o #id o @keyframes)
            if (trimmedLine.match(/^(\.|#|@)[a-zA-Z0-9_-]+/) && line.includes('{')) {
                return <div key={index} className="text-pink-400">{line}</div>;
            }
            
            // Solo llaves de cierre
            if (trimmedLine === '}') {
                return <div key={index} className="text-gray-300">{line}</div>;
            }
            
            // Propiedades CSS con comentarios inline
            if (line.includes(':') && !line.includes('//') && !trimmedLine.startsWith('/*')) {
                // Separar el código CSS del comentario si existe
                const hasComment = line.includes('/*');
                let cssPart = line;
                let commentPart = '';
                
                if (hasComment) {
                    const commentIndex = line.indexOf('/*');
                    cssPart = line.substring(0, commentIndex);
                    commentPart = line.substring(commentIndex);
                }
                
                // Dividir la parte CSS en propiedad y valor
                const colonIndex = cssPart.indexOf(':');
                if (colonIndex > -1) {
                    const property = cssPart.substring(0, colonIndex);
                    const value = cssPart.substring(colonIndex + 1);
                    
                    return (
                        <div key={index}>
                            <span className="text-cyan-400">{property}</span>
                            <span className="text-white">:</span>
                            <span className="text-orange-300">{value}</span>
                            {hasComment && <span className="text-gray-500">{commentPart}</span>}
                        </div>
                    );
                }
            }
            
            // Clases Tailwind
            if (codeMode === "tailwind" && trimmedLine && !trimmedLine.startsWith('/*') && !line.includes('<')) {
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
            
            // Otros (llaves de apertura, etc)
            return <div key={index} className="text-gray-300">{line}</div>;
        });
    };

    return (
        <div className="bg-neutral-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
            <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap break-words sm:whitespace-pre">
                <code>
                    {renderColoredCode()}
                </code>
            </pre>
        </div>
    );
}

export default CodeRenderer;


