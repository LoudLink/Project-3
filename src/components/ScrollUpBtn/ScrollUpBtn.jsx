import "./ScrollUpBtn.css"
import React, { useEffect } from 'react';

function ScrollUpBtn(props) {

    useEffect(()=>{

        
        const mybutton = document.getElementById("myBtn");
        
        function scrollFunction() {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        }
        
        window.onscroll = scrollFunction;
    },[])

    function topFunction() {
        document.body.scrollTop = 0; 
        document.documentElement.scrollTop = 0;
    }
    return (
        <div>
            <button onClick={topFunction} id="myBtn" title="Go to top" className="btn btn-danger text-lead">Top</button>
        </div>
    );
}

export default ScrollUpBtn;