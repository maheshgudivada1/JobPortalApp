import './index.css'

const FailureView = ({onRetry}) => (
  <div className="failure-view-container">
    <img src="error.png" alt="failure view" />
    <h1>Oops! Something Went Wrong</h1>
    <p>We cannot seem to find the page you are looking for</p>
    <button type="button" onClick={onRetry}>
      Retry
    </button>
  </div>
)

export default FailureView
