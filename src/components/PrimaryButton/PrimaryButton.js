import React from 'react';

const PrimaryButton = ({children='Get Started'}) => {
    return (
        <button className="text-white btn btn-primary bg-gradient-to-r from-primary to-secondary">{children}</button>
    );
};

export default PrimaryButton;