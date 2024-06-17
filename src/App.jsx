import React from "react"
import { gsap, Expo } from "gsap";

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

  getData() {
    fetch('./projects.JSON')
      .then(res => res.json())
      .then(data => {
        this.setState({ dataProjects: data })
      })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.dataProjects != this.state.dataProjects) {
      this.projects()
    }
    if (prevState.projectsArr.length != this.state.projectsArr.length) {
      this.loadImages()
    }
    if (prevState._imagesLoaded != this.state._imagesLoaded) {
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
        gsap.to('#loader', 4, { width: `${loaded}%`, ease: Expo.easeInOut, transformOrigin: 'right', overwrite: true })

        if (loaded == 100) {
          this.setState({ _imagesLoaded: true })
        }

      })
    })
  }

  menu() {
    const btnMenu = document.querySelector('#menu-btn')
    const goBack = document.querySelector('#goback')
    let menuOpen = false

    btnMenu.addEventListener('click', () => {
      if (!menuOpen) {
        gsap.to('#menu', 2, { translateX: 0, ease: Expo.easeInOut })
        menuOpen = true
      }
    })

    goBack.addEventListener('click', () => {
      gsap.to('#menu', 2, { translateX: '100%', ease: Expo.easeInOut })
      menuOpen = false
    })
  }

  animationStart() {
    let tl = gsap.timeline()
    tl.to('#loader', { alpha: 0, delay: 4.5 })
      .to('.portfolio-container', { alpha: 1, visibility: 'visible' })
      .fromTo('.project', 2, { scale: 1.02, alpha: 0 }, { scale: 1, transformOrigin: 'center center', alpha: 1, ease: Expo.easeInOut, stagger: 0.01 })
      .to('.nav', 2, { y: 0, alpha: 1, ease: Expo.easeInOut, delay: -2 })
      .set('html', { overflowY: 'scroll' })
      .set('.footer', { visibility: 'visible' })
    this.menu()
  }

  projects() {
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

        <div className="nav">
          <div id="logo" className="nav-section">
            <h1>Gallery</h1>
          </div>

          <div id="menu-wrap" className="nav-section">
            <span id="menu-btn">Menu</span>
          </div>
        </div>

        <div id="menu">
          <span id="goback"> Go Back</span>
          <a className="menu-item" href="#">Home</a>
          <a className="menu-item" href="#">Projects</a>
          <a className="menu-item" href="#">About</a>
          <a className="menu-item" href="#">Contact</a>
        </div>

        <div id="loader-container">
          <div id="loader">
          </div>
        </div>

        <div className="portfolio-container">
          {this.state.projectsArr}
        </div>

        <div className="footer">
          <div id="info">
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ipsum arcu, tristique consectetur condimentum ut, lobortis non arcu. Nullam et est ut mi hendrerit porta. Vestibulum a aliquam nulla.</span>
          </div>
          <div id="social">
            <a href="#">instagram</a>
            <a href="#">linkedin</a>
          </div>
        </div>

      </div>
    )
  }
}