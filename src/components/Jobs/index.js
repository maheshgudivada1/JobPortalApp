import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobCard from '../JobCard'
import Employment from '../Employment'
import FailureView from '../FailureView'
import SalaryRange from '../SalaryRange'
import './index.css'

class Jobs extends Component {
  state = {
    jobsList: [],
    profileDetails: {},
    employmentType: '',
    minimumPackage: '',
    search: '',
    isLoading: false,
    apiStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getJobs()
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({profileDetails: data.profile_details, isLoading: false})
    } else {
      this.setState({apiStatus: 'FAILURE', isLoading: false})
    }
  }

  getJobs = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentType, minimumPackage, search} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobsList = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
        employmentType: job.employment_type,
      }))
      this.setState({jobsList: updatedJobsList, isLoading: false})
    } else {
      this.setState({apiStatus: 'FAILURE', isLoading: false})
    }
  }

  onRetry = () => {
    this.getJobs()
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list">
        {jobsList.map(job => (
          <JobCard key={job.id} jobDetails={job} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({search: event.target.value})
  }

  onChangeEmploymentType = employmentTypeId => {
    this.setState({employmentType: employmentTypeId}, this.getJobs)
  }

  onChangeMinimumPackage = salaryRangeId => {
    this.setState({minimumPackage: salaryRangeId}, this.getJobs)
  }

  renderContent = () => {
    const {isLoading, apiStatus} = this.state

    if (isLoading) {
      return this.renderLoadingView()
    }

    if (apiStatus === 'FAILURE') {
      return this.renderFailureView()
    }

    return this.renderJobsList()
  }

  render() {
    const {profileDetails, search} = this.state
    const {employmentTypesList, salaryRangesList} = this.props

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="type-container">
            <div className="profile-container">
              <img src={profileDetails.profile_image_url} alt="profile" />
              <h1>Mahesh Gudivada</h1>
              <p>{profileDetails.short_bio}</p>
            </div>
            <hr />
            <h1 className="heading2">Type of Employment</h1>
            <ul>
              {employmentTypesList.map(employmentType => (
                <Employment
                  key={employmentType.label}
                  employmentType={employmentType}
                  onChange={this.onChangeEmploymentType}
                />
              ))}
            </ul>
            <hr />
            <h1 className="heading3">Salary Range</h1>
            <ul>
              {salaryRangesList.map(salaryRange => (
                <SalaryRange
                  key={salaryRange.salaryRangeId}
                  salaryRange={salaryRange}
                  onChange={this.onChangeMinimumPackage}
                />
              ))}
            </ul>
          </div>
          <div className="job-container">
            <input
              type="search"
              value={search}
              className="input"
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="button1"
              onClick={this.getJobs}
            >
              Search
            </button>
            {this.renderContent()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
