import React from 'react';

const Container = ({children}) => {
    return (
        <div className='max-w-7xl lg:w-[87.5%] mx-auto'>
           {children} 
        </div>
    );
};

export default Container;