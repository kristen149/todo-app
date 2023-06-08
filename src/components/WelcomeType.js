import React from "react";
import TypewriterComponent from "typewriter-effect";


const WelcomeType = () => {

    return (
        <TypewriterComponent
            options={{
                strings: ["Welcome Back!"],
                autoStart: true,
                loop: true,
                deleteSpeed:50,

            }}
        
        
        />
    )
}

export default WelcomeType;