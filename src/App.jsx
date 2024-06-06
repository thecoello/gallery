import React from "react"
import projectsLocal from "./assets/projects";
import { gsap, Power2, Expo, Linear} from "gsap";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projectsArr: [],
    }
  }

  componentDidMount() {
    this.projects()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.projectsArr.length != this.state.projectsArr.length) {
      this.loadImages()
    }
  }

  loadImages=()=>{
    const images = document.querySelectorAll('img')
    const imagesAvailable = images.length
    let imagesLoaded = 0
    let loaded = 0
    let tl = gsap.timeline()

    images.forEach(img => {
      img.addEventListener('load', (e) => {
        imagesLoaded = imagesLoaded + 1
        loaded = 100 / imagesAvailable * imagesLoaded
        gsap.to('.loader', 4, { width: `${loaded}%`, ease: Power2.easeOut, overwrite: true})
        if(loaded == 100){
          tl.set('#brand-name-wrap',{alpha: 1})
          tl.fromTo('#brand-name', 1,{yPercent: 100},{ yPercent: 0, ease: Expo.easeOut, delay: 4.5})
          tl.fromTo('.intro', 1,{height: '100vh'},{ height: '25vh', ease: Expo.easeOut })
          tl.to('#brand-name-wrap',1,{top: '0vh', delay: -1, ease: Expo.easeOut})
          tl.to('.loader-container', 1,{top: '25vh', bottom: '0vh', delay: -1, transformOrigin: 'right', ease: Expo.easeOut, onStart: ()=>{
            let counter = 0
            document.querySelectorAll('.project').forEach(project => {
              gsap.fromTo(project,1,{y: 20, alpha: 0},{y: 0, delay: counter, alpha: 1, ease: Expo.easeInOut})
              counter += 0.1
            })
          } })
        }

      })  
    
    })
  }

  projects=()=> {
    let projectsArr = []
    projectsLocal.forEach((project, i) => {
      projectsArr.push(<div className="project" key={`${i}-project`}>
         <div className="project-image">
          <img src={project.image} alt={project.nombre} />
        </div>
        <div className="project-text-wrap">
          <p className="project-title">{project.nombre}</p>
          <p className="project-type">{project.categoria}</p>
        </div>
        <div className="border-top"></div>

       
      </div>)
    });
    this.setState({ projectsArr: projectsArr })
  }

  render() {
    return (
      <div className="container">

        <div className="intro">
          <div id="brand-name-wrap">
          <h3 id="brand-name">Gallery</h3>
          </div>
          <div className="loader-container">
            <div className="loader">
            </div>
          </div>
        </div>

        <div className="portfolio-container">

          {this.state.projectsArr}

        </div>
      </div>
    )
  }
}