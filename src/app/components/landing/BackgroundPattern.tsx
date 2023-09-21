import React from 'react';

const BackgroundPattern = () => {
    return (
        <div 
            className="absolute inset-0 bg-no-repeat bg-bottom bg-cover bg-[url('/background.svg')]" 
        />
    );
};

export default React.memo(BackgroundPattern);
