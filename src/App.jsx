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
        gsap.to('.loader', 4, { width: `${loaded}%`, ease: Power2.easeOut, overwrite: true })

        if(loaded == 100){
          this.setState({ _imagesLoaded: true })
        }

      })
    })
  }

  animationStart() {
    let tl = new gsap.timeline()
    tl.set('#brand-name-wrap', { alpha: 1 })
    tl.to('#brand-name', 1, { y: `${0}vh`, ease: Expo.easeOut, delay: 4.5 })
    tl.fromTo('.intro', 1, { height: `${100}vh` }, { height: `${25}vh`, ease: Expo.easeOut })
    tl.to('#brand-name-wrap', 1, { y: 0, delay: -1, ease: Expo.easeOut })
    tl.to('.loader-container', 1, {y: `${15}vh`, delay: -1, transformOrigin: 'right', ease: Expo.easeOut})
    tl.fromTo('.project', 1,{ y: 10, alpha: 0},{ y: 0, alpha: 1, ease: Expo.easeInOut, stagger: 0.1, delay: -1.5})
    gsap.set('html',{overflow: 'auto'})
    gsap.set('body',{overflow: 'auto'})

  }

  projects = () => {
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