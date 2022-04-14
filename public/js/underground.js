const marioFall = document.querySelector("#mario")

marioFall.classList.add("pipeFall")

var left = 0;

document.addEventListener("keydown", event => {
    if (event.code === "ArrowLeft") {
      left = left-1;
      var positionX = left * -180 + "px" ;
      document.querySelector(".flex-container").style.marginLeft = positionX;
      document.querySelector("#mario").className = '';
      document.querySelector("#head").style.backgroundPosition = `${-200 * left}px 00px`;
      document.querySelector("#footer").style.backgroundPosition = `${-200 * left}px 00px`;
      document.querySelector("#pipeTop").style.marginLeft = `${-200 * left}px`;
      document.querySelector("#mario").classList.add("walk-left");
      setTimeout(function() {
        document.querySelector("#mario").className = '';
      }, 500);
    } 

    if (event.code === "ArrowRight") {
        left = left+1;
        var positionX = left * -210 + "px" ;
        document.querySelector(".flex-container").style.marginLeft = positionX;
        document.querySelector("#head").style.backgroundPosition = `${-200 * left}px 00px`;
        document.querySelector("#footer").style.backgroundPosition = `${-200 * left}px 00px`;
        document.querySelector("#pipeTop").style.marginLeft = `${-200 * left}px`;
        document.querySelector("#mario").className = '';
        document.querySelector("#mario").classList.add("walk-right");
        setTimeout(function() {
            document.querySelector("#mario").className = '';
          }, 500);
      } 
  });