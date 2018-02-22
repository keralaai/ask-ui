import React, { Component } from 'react'
import './LandingPage.css'

import swal from 'sweetalert2'
import Typist from 'react-typist'
import '../../../node_modules/react-typist/dist/Typist.css'

import Member from '../Member/Member'
import Doing from '../Doing/Doing'

class LandingPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      likes: ['talks', 'workshops', 'conferences', 'hackathons', 'cool projects'],
      typing: true, // kinda shady
      doings: [
        {
          name: 'Ask',
          description: `So you want to know the feasibility of a project before you start? Is the data you have good enough?
              Or you have already started and need help? We got you.`,
          button: 'Ask',
          link: '/ask',
          onClick: () => {}
        },
        {
          name: 'Find Speakers',
          description:
            'Hosting a machine learning conference at your campus? We can help you find speakers.',
          button: 'Hello',
          onClick: () => {
            swal({
              title: 'Find Speaker',
              type: 'info',
              html: `
      So you have an event coming up. Awesome. We will be glad to find you some great speakers.
      Just email us at the email address below and we will get in touch with you.
      <div class="swal-banner">hello@keralaai.in</div>
      `,
              showCloseButton: true
            })
          }
        },
        {
          name: 'Project Sponsorships',
          description:
            'Think you are on to something? Show us what you are working on. Expert mentorship and funding for the coolest of the coolest.',
          button: '$$$',
          onClick: () => {
            swal({
              title: 'Project Sponsorship',
              type: 'info',
              html: `
      Woo, I guess you have a cool project that you are working on. Need some help with that?
      Contact us and show us what you are working on, and you can actually get it funded and get expert mentorship.
      Get in touch with us at.
      <div class="swal-banner">hello@keralaai.in</div>
      `,
              showCloseButton: true
            })
          }
        }
      ],
      members: [
        {
          name: 'Gopikrishnan Sasikumar',
          email: 'gopikrishnans1996@gmail.com',
          github: 'GopikrishnanSasikumar',
          twitter: 'gopidotai',
          facebook: 'Gopikrishnan Sasikumar',
          photo: '/photos/IMG_20171127_014318_652 - gopi krishnan-min.jpg'
        },
        {
          name: 'Praveen Sridhar',
          email: 'prvn431@gmail.com',
          github: 'psbots',
          twitter: 'psbots',
          facebook: '',
          photo: '/photos/IMG_20170910_143601 - Praveen Sridhar-min.jpg'
        },
        {
          name: 'Fariz Rahman',
          email: 'farizrahman4u@gmail.com',
          github: 'farizrahman4u',
          twitter: 'farizrahman4u',
          facebook: '',
          photo: '/photos/FB_IMG_1518198312917 - Fariz Rahman-min.jpg'
        },
        {
          name: 'V Mohammed Ibrahim',
          email: 'ibrahimjkd@gmail.com',
          github: 'ibrahiminfinite',
          twitter: 'ibrahiminfinite',
          facebook: '',
          photo: '/photos/IMG_20171103_112556 - MOHAMMED IBRAHIM-min.jpg'
        },
        {
          name: 'Abhai Kollara Dilip',
          email: 'abhai.dilip@gmail.com',
          github: 'abhaikollara',
          twitter: 'meAbhai',
          facebook: 'abhaikollara',
          photo: '/photos/Abhai Kollara Dilip-Passport size photograph - Abhai Kollara-min.JPG'
        },
        {
          name: 'Christie J Purackal',
          email: 'christeejacobs@gmail.com',
          github: 'true-source',
          twitter: 'Christyjacob126',
          facebook: '',
          photo: '/photos/IMG_20180124_115737_688 - Christie Jacob-min.jpg'
        },
        {
          name: 'Siddharth Prajosh',
          email: 'sprajosh@gmail.com',
          github: 'Sprajosh',
          twitter: 'Sprajosh',
          facebook: 'Sprajosh',
          photo: '/photos/IMG-20171130-WA0023 - Siddharth Prajosh-min.jpg'
        },
        {
          name: 'Abin Simon',
          email: 'abinsimon10@gmail.com',
          github: 'meain',
          twitter: 'meain_',
          facebook: 'abinsimon10',
          photo: '/photos/DSC_1129-01 (1)-min.jpeg'
        }
      ]
    }

    this.typingDone = this.typingDone.bind(this)
  }

  typingDone = () => {
    this.setState({ typing: false }, () => {
      this.setState({ typing: true })
    })
  }

  showFindSpeakerMessage() {
    swal({
      title: 'Find Speaker',
      type: 'info',
      html: `
      So you have an event coming up. Awesome. We will be glad to find you some great speakers.
      Just email us at the email address below and we will get in touch with you.
      <div class="swal-banner">hello@keralaai.in</div>
      `,
      showCloseButton: true
    })
  }

  showProjectSponsorshipMessage() {
    swal({
      title: 'Project Sponsorship',
      type: 'info',
      html: `
      Woo, I guess you have a cool project that you are working on. Need some help with that?
      Contact us and show us what you are working on, and you can actually get it funded and get expert mentorship.
      Get in touch with us at.
      <div class="swal-banner">hello@keralaai.in</div>
      `,
      showCloseButton: true
    })
  }

  render() {
    return (
      <div className="LandingPage">
        <div className="LandingPage-header">
          <span>KERALA AI INITIATIVE</span>
        </div>
        <div id="LandingPage-section-1">
          <div className="LandingPage-section-1-content">
            <span>We love </span>
            {this.state.typing ? (
              <Typist onTypingDone={this.typingDone}>
                talks
                <Typist.Delay ms={500} />
                <Typist.Backspace count={5} delay={500} />
                workshops
                <Typist.Delay ms={500} />
                <Typist.Backspace count={9} delay={500} />
                conferences
                <Typist.Delay ms={500} />
                <Typist.Backspace count={11} delay={500} />
                hackathons
                <Typist.Delay ms={500} />
                <Typist.Backspace count={10} delay={500} />
                cool projects
                <Typist.Delay ms={500} />
                <Typist.Backspace count={13} delay={700} />
              </Typist>
            ) : (
              ''
            )}
          </div>
        </div>
        <div id="LandingPage-section-2">
          <h2 className="LandingPage-section-2-tagline">
            We are an <span className="LandingPage-2-tagline-highlight">open community</span>{' '}
            dedicated to advancing{' '}
            <span className="LandingPage-2-tagline-highlight">AI research</span> in{' '}
            <span className="LandingPage-2-tagline-highlight">Kerala</span> by bringing together
            academics, researchers and industry experts alike.
          </h2>
        </div>
        <div id="LandingPage-section-3">
          {this.state.doings.map((doing, i) => <Doing key={i} data={doing} />)}
        </div>
        <div id="LandingPage-section-4">
          <div className="LandingPage-section-header">MEMBERS</div>
          {this.state.members.map((member, i) => <Member key={i} data={member} />)}
        </div>
        <div id="LandingPage-section-5">Copyright Keralaai 2018</div>
      </div>
    )
  }
}

export default LandingPage
