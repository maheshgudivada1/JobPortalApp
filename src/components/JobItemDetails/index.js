import {Component} from 'react'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FailureView from '../FailureView'
import './index.css'

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    isLoading: true,
    apiStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        this.setState({
          jobDetails: data.job_details,
          similarJobs: data.similar_jobs,
          isLoading: false,
        })
      } else {
        throw new Error('Failed to fetch job details')
      }
    } catch (error) {
      this.setState({apiStatus: 'FAILURE', isLoading: false})
    }
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    return (
      <div className="job-details">
        <img
          src={jobDetails.company_logo_url}
          className="logo"
          alt={jobDetails.company_name}
        />
        <h1 className="job-title">{jobDetails.title}</h1>
        <div className="job-header">
          <p className="company-name">{jobDetails.company_name}</p>
          <div className="location-container">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHtCYWR0GHtq18ERI3RqiActjzvKOGNGfZjA&s"
              alt="location"
              className="location-icon"
            />
            <p id="location1">{jobDetails.location}</p>
          </div>
          <div className="employment-type-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/71/71200.png"
              alt="employment type"
              className="employment-type-icon"
            />
            <p id="location1">{jobDetails.employment_type}</p>
          </div>
          <p className="package-per-annum">{jobDetails.package_per_annum}</p>
        </div>
        <hr />
        <h1 className="heading4">Description</h1>
        <div id="anchor-element">
          <a
            href={jobDetails.company_website_url}
            rel="noopener noreferrer"
            className="url"
          >
            Visit <FaExternalLinkAlt />
          </a>
        </div>
        <p className="job-description">{jobDetails.job_description}</p>
        <div className="skills">
          <h1 className="heading4">Skills</h1>
          <ul className="ul-list">
            {jobDetails.skills.map(skill => (
              <li key={skill.name} className="list-item">
                <img
                  src={skill.image_url}
                  alt={skill.name}
                  className="skill-icon"
                />
                <p>{skill.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="life-at-company">
          <h1 className="heading4">Life at Company</h1>
          <div className="lower-continer">
            <p className="para">{jobDetails.life_at_company.description}</p>
            <img
              src={jobDetails.life_at_company.image_url}
              alt="life at company"
              className="company-image"
            />
          </div>
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <>
        <h1 className="heading4">Similar Jobs</h1>
        <div className="similar-jobs">
          <ul className="similar-jobs-list">
            {similarJobs.map(job => (
              <li key={job.id} className="similar-job-item">
                <img
                  src={job.company_logo_url}
                  alt={job.title}
                  className="logo"
                />
                <div>
                  <h1 className="similar-job-title">{job.title}</h1>
                  <p className="company-name">{job.company_name}</p>
                  <div className="location-container">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHtCYWR0GHtq18ERI3RqiActjzvKOGNGfZjA&s"
                      alt="location"
                      className="location-icon"
                    />
                    <p id="location1">{job.location}</p>
                    <div className="employment-type-container">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/71/71200.png"
                        alt="employment type"
                        className="employment-type-icon1"
                      />
                      <p id="location1">{job.employment_type}</p>
                    </div>
                  </div>
                  <h1 className="heading4">Description</h1>
                  <p>{job.job_description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderContent = () => {
    const {isLoading, apiStatus} = this.state
    if (isLoading) {
      return (
        <div className="loader">
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )
    }
    if (apiStatus === 'FAILURE') {
      return <FailureView />
    }
    return (
      <>
        {this.renderJobDetails()}
        {this.renderSimilarJobs()}
      </>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details">{this.renderContent()}</div>
      </>
    )
  }
}

export default JobItemDetails
