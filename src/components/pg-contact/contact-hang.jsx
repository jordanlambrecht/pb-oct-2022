import React, { useEffect } from "react";
import socialLinks from "../../data/socialLinks";
import StrokeText from "../parts/strokeText";

function HangOut(){
     useEffect(() => {
          const socialLinks = document.querySelectorAll("svg.social-link");
          socialLinks.forEach(svg => {
               let  bbox = svg.getBBox();
               svg.setAttribute("width", bbox.x + bbox.width + bbox.x);
               svg.setAttribute("height", (bbox.y/3) + bbox.height);
               svg.firstChild.setAttribute("y", "66%");
          });
          return () => {
               
          }
     }, [])
     return(
          <section className="my-4 mx-auto py-6">
               <div className="max-w-7xl  mx-auto">
                    <h2 className="my-16 text-blue">Let's hang out </h2>
                    <ul className="my-8 flex gap-x-12 gap-y-6 flex-wrap">
                    { socialLinks.map(link=>(
                         <li className="" key={link.name} ><a href={link.url} target="_blank">
                              <StrokeText 
                         text={link.name} 
                         fontSize={"text-5xl"}
                         strokeWidth={"stroke-1"} 
                         color={"blue-dark"}
                         fontWeight={"font-black"}
                         />
                         </a></li>
                                
                            ))}
                         
                             
                    </ul>
               </div>
               <div>
                    
               </div>
          </section>
     )
}
export default HangOut