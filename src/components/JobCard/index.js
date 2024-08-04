import {Link} from 'react-router-dom'
import './index.css'

const JobCard = ({jobDetails}) => {
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    location,
    rating,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="job-link">
        <div className="job-card-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="job-card-title">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <img
                src="https://img.freepik.com/premium-vector/gold-star-logo-vector-isolated-white-background_162100-444.jpg"
                alt="rating star"
                className="rating-star"
              />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-card-details">
          <div className="job-location-employment-type">
            <div className="location-container">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHtCYWR0GHtq18ERI3RqiActjzvKOGNGfZjA&s"
                alt="location"
                className="location-icon"
              />
              <p className="location">{location}</p>
            </div>
            <div className="employment-type-container">
              <img
                src="https://cdn-icons-png.flaticon.com/512/71/71200.png"
                alt="employment type"
                className="employment-type-icon"
              />
              <p className="employment-type">{employmentType}</p>
            </div>
          </div>
          <div className="package-container">
            <p className="package">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="separator" />
        <div className="job-description">
          <h2>Description</h2>
          <p className="description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
