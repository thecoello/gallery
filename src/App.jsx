import React from "react"
import { gsap, Power2, Expo, Linear } from "gsap";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projectsArr: [],
      _imagesLoaded: false,
      dataProjects: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData(){
    fetch('./projects.JSON')
    .then(res => res.json())
    .then(data => {
      this.setState({dataProjects: data})
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.dataProjects != this.state.dataProjects){
      this.projects()
    }
    if(prevState.projectsArr.length != this.state.projectsArr.length){
      this.loadImages()
    }
    if(prevState._imagesLoaded != this.state._imagesLoaded){
      this.animationStart()
    }
  }

  loadImages() {
    const images = document.querySelectorAll('img')
    const imagesAvailable = images.length
    let imagesLoaded = 0
    let loaded = 0

    images.forEach(img => {
      img.addEventListener('load', (e) => {
        imagesLoaded = imagesLoaded + 1
        loaded = 100 / imagesAvailable * imagesLoaded
        gsap.to('.loader', 4, { width: `${loaded}%`, ease: Power2.easeInOut, transformOrigin: 'right', overwrite: true })

        if(loaded == 100){
          this.setState({ _imagesLoaded: true })
        }

      })
    })
  }

  animationStart() {
    let tl = new gsap.timeline()
    tl.set('#brand-name-wrap', { alpha: 1 })
    tl.to('#brand-name', 2, { y: `${0}vh`, ease: Expo.easeInOut, delay: 4.5 })
    tl.fromTo('.intro', 2, { height: `${100}vh` }, { height: `${25}vh`, ease: Expo.easeInOut })
    tl.to('#brand-name-wrap', 2, { y: 0, delay: -2, ease: Expo.easeInOut })
    tl.to('.loader-container', 2, {y: `${15}vh`, delay: -2, transformOrigin: 'right', ease: Expo.easeInOut})
    window.innerWidth < 900 ? tl.to('#brand-name', 2, {scale: 0.9, ease: Expo.easeInOut, delay: -2 }) : tl.to('#brand-name', 2, {scale: 0.8, ease: Expo.easeInOut, delay: -2 })
    tl.fromTo('.project', 2,{ y: 10, alpha: 0},{ y: 0, alpha: 1, ease: Expo.easeInOut, stagger: 0.1, delay: -2.5})
    tl.set('html',{overflowY: 'auto', delay: -2})
    tl.fromTo('.project .border-top', 2,{ scaleX: 0},{ scaleX: 1, ease: Expo.easeInOut, transformOrigin: 'left', delay: -2})
    tl.to('.loader', 2,{ alpha: 0, ease: Expo.easeInOut, delay: -2.5})
    
  }

  projects(){
    let projectsArr = []
    this.state.dataProjects.forEach((project, i) => {
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