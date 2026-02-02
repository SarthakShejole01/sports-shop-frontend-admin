import React from 'react';

const LoadingSpinner = ({ fullScreen = false }) => {
    const spinner = (
        <div className="spinner" style={{
            width: '40px',
            height: '40px',
            border: '4px solid var(--primary-light)',
            borderTop: '4px solid var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }} />
    );

    if (fullScreen) {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-surface">
                {spinner}
            </div>
        );
    }

    return <div className="flex justify-center p-4">{spinner}</div>;
};

// Add keyframes to document head if not present (simple hack for no-css-module)
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  `;
    document.head.appendChild(styleSheet);
}

export default LoadingSpinner;
